/* eslint-disable react-hooks/refs */
"use client";

import React, { useRef, createRef } from "react";
import { User, FolderOpen, Layout, StickyNote, Github, Mail } from "lucide-react";
import styles from "@/assets/css/desktop.module.css";

// 💡 여기서 ALL_APPS는 아이콘 배치용으로만 쓰임
export const ALL_APPS = [
  { id: "about", label: "About", icon: <User size={32} color="#60a5fa" />, side: "left" },
  { id: "projects", label: "Projects", icon: <FolderOpen size={32} color="#a78bfa" />, side: "left" },
  { id: "skills", label: "Skills", icon: <Layout size={32} color="#f472b6" />, side: "left" },
  { id: "memo", label: "Memo", icon: <StickyNote size={32} color="#fbbf24" />, side: "right" },
  { id: "github", label: "Github", icon: <Github size={32} color="#ffffff" />, side: "right" },
  { id: "contact", label: "Contact", icon: <Mail size={32} color="#34d399" />, side: "right" },
];

interface DesktopIconsProps {
  onOpenApp: (id: string, rect: DOMRect | null) => void;
}

export default function DesktopIcons({ onOpenApp }: DesktopIconsProps) {
  const leftIcons = ALL_APPS.filter((app) => app.side === "left");
  const rightIcons = ALL_APPS.filter((app) => app.side === "right");
  const iconRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});

  if (Object.keys(iconRefs.current).length === 0) {
    ALL_APPS.forEach((app) => {
      iconRefs.current[app.id] = createRef<HTMLDivElement>();
    });
  }

  const handleDoubleClick = (id: string) => {
    const iconBounds = iconRefs.current[id]?.current?.getBoundingClientRect() || null;
    onOpenApp(id, iconBounds);
  };

  return (
    <div className={styles.desktopContainer}>
      <div className={styles.column}>
        {leftIcons.map((app) => (
          <div key={app.id} className={styles.iconWrapper} onDoubleClick={() => handleDoubleClick(app.id)} ref={iconRefs.current[app.id]}>
            <div className={styles.iconBox}>{app.icon}</div>
            <span className={styles.label}>{app.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.column}>
        {rightIcons.map((app) => (
          <div key={app.id} className={styles.iconWrapper} onDoubleClick={() => handleDoubleClick(app.id)} ref={iconRefs.current[app.id]}>
            <div className={styles.iconBox}>{app.icon}</div>
            <span className={styles.label}>{app.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}