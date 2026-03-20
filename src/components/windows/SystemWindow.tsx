import styles from "@/assets/css/windows/system.module.css";

export default function AboutSystem() {
  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>T</div>
      <h1 className={styles.title}>TaeYeon OS</h1>
      <p className={styles.version}>Version 1.0.0 (Sonoma-inspired)</p>

      <div className={styles.specList}>
        <div className={styles.specItem}>
          <span className={styles.label}>Processor</span>
          <span className={styles.value}>Next.js 15 (App Router)</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.label}>Memory</span>
          <span className={styles.value}>Tailwind CSS & Framer Motion</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.label}>Graphics</span>
          <span className={styles.value}>Lucide React Icons</span>
        </div>
      </div>

      <p className={styles.copyright}>
        TM and © 2026 TaeYeon Kim. <br /> All Rights Reserved.
      </p>
    </div>
  );
}