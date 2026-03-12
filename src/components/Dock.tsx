"use client";

import React, { useRef } from "react";
import { 
  Github, Mail, User, FolderOpen, Layout, StickyNote
} from "lucide-react";
import styles from "@/assets/css/dock.module.css";

// 💡 Dock 앱 리스트 (ID를 DesktopIcons와 통일하는 게 중요!)
const DOCK_APPS = [
  { id: "about", label: "About", icon: <User size={28} /> },
  { id: "projects", label: "Projects", icon: <FolderOpen size={28} /> },
  { id: "skills", label: "Skills", icon: <Layout size={28} /> },
  { id: "memo", label: "Memo", icon: <StickyNote size={28} /> },
  { id: "github", label: "Github", icon: <Github size={28} /> },
  { id: "contact", label: "Contact", icon: <Mail size={28} /> },
];

interface DockProps {
  onOpenApp: (id: string, rect: DOMRect | null) => void;
}

export default function Dock({ onOpenApp }: DockProps) {
  // 💡 각 아이콘의 위치를 파악하기 위한 Ref들
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleAppClick = (id: string) => {
    // 클릭한 아이콘의 현재 위치(좌표/크기) 가져오기
    const rect = itemRefs.current[id]?.getBoundingClientRect() || null;
    
    // 부모(page.tsx)에게 "이 ID의 앱을 이 위치에서 열어줘!"라고 요청
    onOpenApp(id, rect);
  };

  return (
    <div className={styles.dockWrapper}>
      <div className={styles.hintText}>HOVER TO EXPLORE</div>

      <div className={styles.dockContainer}>
        {DOCK_APPS.map((app) => (
          <div 
            key={app.id} 
            ref={(el) => { itemRefs.current[app.id] = el; }} // 위치 추적용 Ref 연결
            className={styles.dockItem}
            onClick={() => handleAppClick(app.id)}
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