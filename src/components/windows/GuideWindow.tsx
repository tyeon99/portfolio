import styles from "@/assets/css/windows/guide.module.css";
import { MousePointer2, Monitor, Layout } from "lucide-react";

export default function Guide() {
  const steps = [
    { icon: <Monitor size={18} />, text: "상단 메뉴바를 통해 시스템 설정을 제어하세요." },
    { icon: <MousePointer2 size={18} />, text: "바탕화면 아이콘을 더블 클릭하여 앱을 실행하세요." },
    { icon: <Layout size={18} />, text: "하단 Dock을 통해 자주 쓰는 앱에 빠르게 접근하세요." },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>💡 조작 가이드</h2>
      <div className={styles.list}>
        {steps.map((step, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.iconBox}>{step.icon}</div>
            <p className={styles.text}>{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}