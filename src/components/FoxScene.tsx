"use client";

import { Suspense, useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/LowPolyFox.glb";

// Topmost bones in the neck/head deform chain, base first. Rotating these
// (weighted, tip moving most) reads as the head turning toward the cursor.
// Note: GLTFLoader strips dots from node names on load (DEF-spine.011 -> DEF-spine011).
const HEAD_CHAIN = ["DEF-spine009", "DEF-spine010", "DEF-spine011"];
const HEAD_WEIGHTS = [0.28, 0.34, 0.38]; // fraction of the turn added at each joint, base to tip
const HEAD_ANCHOR = "DEF-spine010"; // used to aim the camera at the face

// Rear legs, folded under into a static sit pose (front legs stay as-authored).
const REAR_LEFT_THIGH = "DEF-thighL";
const REAR_RIGHT_THIGH = "DEF-thighR";
const REAR_LEFT_SHIN = "DEF-shinL";
const REAR_RIGHT_SHIN = "DEF-shinR";
const SIT_REAR_THIGH = THREE.MathUtils.degToRad(-58);
const SIT_REAR_SHIN = THREE.MathUtils.degToRad(70);
const SIT_BODY_DROP = 0.05;

const MAX_YAW = THREE.MathUtils.degToRad(22);
const MAX_PITCH = THREE.MathUtils.degToRad(15);
const SMOOTHING = 0.06;
const IDLE_SMOOTHING = 0.03;
const IDLE_TIMEOUT_MS = 2500;

interface HeadJoint {
  bone: THREE.Object3D;
  parent: THREE.Object3D;
  baseQuat: THREE.Quaternion;
  weight: number;
}

/**
 * Tracks the cursor (mouse) or a touch anywhere in the hero section — not
 * just while hovering the canvas itself, which is all R3F's built-in
 * pointer gives us — and exposes normalized [-1, 1] coordinates plus a
 * last-active timestamp via a ref, so Fox can read them every frame without
 * re-rendering and fall back to an idle animation once input goes stale
 * (touch has no persistent "hover", and this doubles as the idle trigger
 * on desktop too).
 *
 * The origin is the fox's own on-screen position (its container's center),
 * not the hero section's center — otherwise, since the fox sits off to one
 * side of the hero, the "straight ahead" gaze wouldn't line up with the
 * cursor actually being over the fox. Range is scaled to the hero's size so
 * cursor movement anywhere in the hero still drives the full rotation range.
 */
function useHeroPointer(containerRef: RefObject<HTMLDivElement | null>) {
  const pointer = useRef({ x: 0, y: 0, lastActive: 0 });

  useEffect(() => {
    const heroEl = document.getElementById("top");

    const update = (clientX: number, clientY: number) => {
      const originEl = containerRef.current;
      if (!originEl) return;

      const originRect = originEl.getBoundingClientRect();
      const centerX = originRect.left + originRect.width / 2;
      const centerY = originRect.top + originRect.height / 2;

      const heroRect = (heroEl ?? document.documentElement).getBoundingClientRect();
      const radiusX = heroRect.width / 2;
      const radiusY = heroRect.height / 2;

      const nx = (clientX - centerX) / radiusX;
      const ny = (clientY - centerY) / radiusY;
      pointer.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp(ny, -1, 1);
      pointer.current.lastActive = performance.now();
    };

    const handleMove = (e: PointerEvent) => update(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return pointer;
}

/**
 * Picks the next spot for the idle glance: mostly a moderate turn to one
 * side, sometimes a bigger alert glance, and often just back to center —
 * real animals hold a gaze rather than continuously drifting.
 */
function pickIdleTarget() {
  const r = Math.random();
  if (r < 0.3) {
    return { x: 0, y: THREE.MathUtils.randFloatSpread(0.08) };
  }
  const big = r > 0.85;
  const x = THREE.MathUtils.randFloatSpread(2) * (big ? 0.95 : 0.55);
  const y = THREE.MathUtils.randFloatSpread(2) * 0.22;
  return { x, y };
}

/** How long to hold a glance before picking the next one. */
function nextIdleHoldSeconds() {
  return THREE.MathUtils.randFloat(1.1, 3.2);
}

function Fox({
  pointer,
}: {
  pointer: RefObject<{ x: number; y: number; lastActive: number }>;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const { camera } = useThree();
  const headJoints = useRef<HeadJoint[]>([]);
  const gaze = useRef({ yaw: 0, pitch: 0 });
  const idle = useRef({ target: { x: 0, y: 0 }, nextChange: 0 });

  useEffect(() => {
    // Recenter the model — its mesh isn't authored around the local origin —
    // so it sits in the middle of the circular frame instead of off to one side.
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.x -= center.x;
    scene.position.z -= center.z;
    scene.position.y -= box.min.y;
    scene.position.y -= SIT_BODY_DROP;

    scene.updateMatrixWorld(true);

    // Fold the rear legs into a sit pose, once, as the resting pose.
    for (const [name, angle] of [
      [REAR_LEFT_THIGH, SIT_REAR_THIGH],
      [REAR_RIGHT_THIGH, SIT_REAR_THIGH],
      [REAR_LEFT_SHIN, SIT_REAR_SHIN],
      [REAR_RIGHT_SHIN, SIT_REAR_SHIN],
    ] as const) {
      const bone = scene.getObjectByName(name);
      if (!bone) {
        throw new Error(`FoxScene: bone "${name}" not found in model`);
      }
      const offset = new THREE.Quaternion().setFromEuler(new THREE.Euler(angle, 0, 0));
      bone.quaternion.multiply(offset);
    }

    headJoints.current = HEAD_CHAIN.map((name, i) => {
      const bone = scene.getObjectByName(name);
      if (!bone || !bone.parent) {
        throw new Error(`FoxScene: bone "${name}" not found in model`);
      }
      return {
        bone,
        parent: bone.parent,
        baseQuat: bone.quaternion.clone(),
        weight: HEAD_WEIGHTS[i],
      };
    });

    // Aim the camera at the face (not a guessed fraction of body height) so
    // it stays centered regardless of the model's proportions.
    const anchor = scene.getObjectByName(HEAD_ANCHOR);
    const target = new THREE.Vector3();
    anchor?.getWorldPosition(target);
    camera.lookAt(target);
  }, [scene, camera]);

  useFrame((state) => {
    const isActive = performance.now() - pointer.current.lastActive < IDLE_TIMEOUT_MS;

    if (!isActive && state.clock.elapsedTime >= idle.current.nextChange) {
      idle.current.target = pickIdleTarget();
      idle.current.nextChange = state.clock.elapsedTime + nextIdleHoldSeconds();
    }

    const target = isActive ? pointer.current : idle.current.target;
    const smoothing = isActive ? SMOOTHING : IDLE_SMOOTHING;

    gaze.current.yaw = THREE.MathUtils.lerp(gaze.current.yaw, target.x * MAX_YAW, smoothing);
    gaze.current.pitch = THREE.MathUtils.lerp(gaze.current.pitch, target.y * MAX_PITCH, smoothing);

    // Rotate each joint by a fraction of the turn, expressed in true world
    // space (world-vertical for yaw, world-horizontal for pitch) rather than
    // each bone's own local axes — the neck's rest curve tilts those local
    // axes, so a naive local rotation reads as an axial twist instead of a
    // clean turn. Converting into each bone's local frame (relative to its
    // parent's *current* world orientation, updated base-to-tip) fixes that.
    const parentWorldQuat = new THREE.Quaternion();
    const localOffset = new THREE.Quaternion();
    for (const { bone, parent, baseQuat, weight } of headJoints.current) {
      const worldOffset = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(gaze.current.pitch * weight, gaze.current.yaw * weight, 0),
      );
      parent.getWorldQuaternion(parentWorldQuat);
      localOffset.copy(parentWorldQuat).invert().multiply(worldOffset).multiply(parentWorldQuat);
      bone.quaternion.copy(localOffset).multiply(baseQuat);
    }
  });

  return <primitive object={scene} />;
}

/** Simple three-point studio rig: key, fill, and an amber rim light. */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Key */}
      <directionalLight position={[2.2, 3.2, 2.6]} intensity={2.4} color="#fff4e6" />
      {/* Fill — soft, opposite the key, no shadow */}
      <directionalLight position={[-2.6, 1.2, 1.8]} intensity={0.7} color="#cfe0f0" />
      {/* Rim — behind/above, picks out the silhouette in the brand amber */}
      <directionalLight position={[-0.6, 2.2, -2.8]} intensity={1.8} color="#ef6f34" />
    </>
  );
}

export default function FoxScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useHeroPointer(containerRef);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0.42, 1.85], fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <StudioLighting />
        <Suspense fallback={null}>
          <Fox pointer={pointer} />
          <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={3} blur={2.2} far={1.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
