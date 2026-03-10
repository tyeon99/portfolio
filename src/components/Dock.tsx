"use client";

import { 
  Github, Mail, User, FolderOpen, Layout, StickyNote
} from "lucide-react";
import styles from "@/assets/css/dock.module.css";

const DOCK_APPS = [
  { id: "about", label: "About", icon: <User size={28} />, action: "open_about" },
  { id: "projects", label: "Projects", icon: <FolderOpen size={28} />, action: "open_projects" },
  { id: "skills", label: "Skills", icon: <Layout size={28} />, action: "open_skills" },
  { id: "memo", label: "Memo", icon: <StickyNote size={28} />, action: "open_memo" },
  { id: "github", label: "Github", icon: <Github size={28} />, action: "link", url: "https://github.com/tyeon99" },
  { id: "contact", label: "Contact", icon: <Mail size={28} />, action: "copy" },
];

export default function Dock() {
  const handleAppClick = (app: typeof DOCK_APPS[0]) => {
    if (app.action === "link" && app.url) {
      window.open(app.url, "_blank");
    } else if (app.action === "copy") {
      navigator.clipboard.writeText("xodus170@naver.com");
      alert("이메일 주소가 복사되었습니다!");
    } else {
      alert(`${app.label} 앱을 실행합니다.`);
    }
  };

  return (
    /* 1. 마우스 감지 영역 */
    <div className={styles.dockWrapper}>
      
      {/* 2. 유도 문구 */}
      <div className={styles.hintText}>HOVER TO EXPLORE</div>

      {/* 3. 실제 Dock */}
      <div className={styles.dockContainer}>
        {DOCK_APPS.map((app) => (
          <div 
            key={app.id} 
            className={styles.dockItem}
            onClick={() => handleAppClick(app)}
          >
            <div className={styles.tooltip}>{app.label}</div>
            <div className={styles.dockIcon}>{app.icon}</div>
            <div className={styles.activeDot} />
          </div>
        ))}
      </div>
    </div>
  );
}