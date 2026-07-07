import styles from "@/app/page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        <span>© {new Date().getFullYear()} Anthony Fox</span>
        <span>Built with Next.js · Rendered in Blender</span>
      </div>
    </footer>
  );
}
