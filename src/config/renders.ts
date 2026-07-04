import { mediaUrl, previewUrl } from "@/lib/media";
import type { Render } from "@/components/RenderModal";

/**
 * `src` is the lightweight 720p preview (tiles/hero/featured); `full` is the
 * 4K original streamed from the CDN, used only when a render is expanded.
 */
function render(
  name: string,
  filename: string,
  resolution: string,
  portrait = false
): Render {
  return { src: previewUrl(name), full: mediaUrl(name), filename, resolution, portrait };
}

/** The hero showcase render. */
export const HERO_RENDER: Render = render(
  "forest_garden",
  "forest_garden.blend",
  "3840×2160 · CYCLES"
);

/**
 * The renders section. The first entry is featured (wide); the rest fill the grid.
 */
export const RENDERS: Render[] = [
  render("desk_in_field", "desk_in_field.blend", "3840×2160 · CYCLES"),
  render("simple_tree_in_room", "simple_tree_in_room.blend", "3840×2160 · CYCLES"),
  render("forest_tree_house", "forest_tree_house.blend", "3840×2160 · CYCLES"),
  render("ancient_meeting_place", "ancient_meeting_place.blend", "1920×1080 · CYCLES"),
  render("preserving_beauty", "preserving_beauty.blend", "1280×720 · CYCLES"),
  render("no_mans_sky_monolith", "no_mans_sky_monolith.blend", "1080×1920 · CYCLES", true),
  render("stain_glass_hallway", "stain_glass_hallway.blend", "1080×1920 · CYCLES", true),
];
