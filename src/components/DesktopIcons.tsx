/* eslint-disable react-hooks/refs */
"use client";

import React, { useState, useRef, useEffect, createRef } from "react";
import { User, FolderOpen, Layout, StickyNote, Github, Mail } from "lucide-react";
import styles from "@/assets/css/desktop.module.css";
import winStyles from "@/assets/css/window.module.css";

// 컴포넌트 import
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import MemoWindow from "@/components/windows/MemoWindow";
import GithubWindow from "@/components/windows/GithubWindow";
import ContactWindow from "@/components/windows/ContactWindow";

const ALL_APPS = [
  { id: "about", label: "About", icon: <User size={32} color="#60a5fa" />, side: "left" },
  { id: "projects", label: "Projects", icon: <FolderOpen size={32} color="#a78bfa" />, side: "left" },
  { id: "skills", label: "Skills", icon: <Layout size={32} color="#f472b6" />, side: "left" },
  { id: "memo", label: "Memo", icon: <StickyNote size={32} color="#fbbf24" />, side: "right" },
  { id: "github", label: "Github", icon: <Github size={32} color="#ffffff" />, side: "right" },
  { id: "contact", label: "Contact", icon: <Mail size={32} color="#34d399" />, side: "right" },
];

// ID와 컴포넌트를 매칭하는 객체 생성 
const WINDOW_COMPONENTS: Record<string, React.ReactNode> = {
  about: <AboutWindow />,
  projects: <ProjectsWindow />,
  skills: <SkillsWindow />,
  memo: <MemoWindow />,
  github: <GithubWindow />,
  contact: <ContactWindow />,
};

export default function DesktopIcons() {
  const leftIcons = ALL_APPS.filter((app) => app.side === "left");
  const rightIcons = ALL_APPS.filter((app) => app.side === "right");

  const iconRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});

  if (Object.keys(iconRefs.current).length === 0) {
    ALL_APPS.forEach((app) => {
      iconRefs.current[app.id] = createRef<HTMLDivElement>();
    });
  }

  const [openWindowData, setOpenWindowData] = useState<{ id: string; fromRect: DOMRect | null }[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [windowAnimationState, setWindowAnimationState] = useState<Record<string, "initial" | "final">>({});
  
  const draggingApp = useRef<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  // 💡 [핵심 추가] 클릭한 창을 맨 앞으로 가져오는 로직
  const bringToFront = (id: string) => {
    setOpenWindowData((prev) => {
      const targetWindow = prev.find((w) => w.id === id);
      if (!targetWindow) return prev;
      // 클릭한 창을 배열에서 빼서 맨 뒤(최상단)로 다시 넣음
      const filtered = prev.filter((w) => w.id !== id);
      return [...filtered, targetWindow];
    });
  };

  const handleDoubleClick = (id: string) => {
    if (!openWindowData.some((win) => win.id === id)) {
      const appInfo = ALL_APPS.find(a => a.id === id);
      const iconBounds = iconRefs.current[id]?.current?.getBoundingClientRect();

      const newWindow = { id, fromRect: iconBounds || null };
      setOpenWindowData((prev) => [...prev, newWindow]);

      const count = openWindowData.length;
      let targetX = 150 + count * 40;
      const targetY = 100 + count * 40;

      if (appInfo?.side === "right") {
        targetX = window.innerWidth - 750 - (count * 40);
      }

      setPositions((prev) => ({
        ...prev,
        [id]: { x: targetX, y: targetY },
      }));

      setWindowAnimationState((prev) => ({ ...prev, [id]: "initial" }));

      setTimeout(() => {
        setWindowAnimationState((prev) => ({ ...prev, [id]: "final" }));
      }, 10);
    } else {
      // 이미 열려있다면 맨 앞으로만 가져옴
      bringToFront(id);
    }
  };

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    bringToFront(id); // 드래그 시작할 때도 맨 앞으로!
    draggingApp.current = id;
    const pos = positions[id] || { x: 100, y: 100 };
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingApp.current) return;
      const id = draggingApp.current;
      setPositions((prev) => ({
        ...prev,
        [id]: { x: e.clientX - offset.current.x, y: e.clientY - offset.current.y },
      }));
    };
    const onMouseUp = () => { draggingApp.current = null; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const closeWindow = (id: string) => {
    setWindowAnimationState((prev) => ({ ...prev, [id]: "initial" }));
    setTimeout(() => {
      setOpenWindowData((prev) => prev.filter((app) => app.id !== id));
    }, 400);
  };

  return (
    <>
      <div className={styles.desktopContainer}>
        {/* 아이콘 섹션 (기존과 동일) */}
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

      {/* 🚀 창 렌더링 */}
      {openWindowData.map((window, index) => {
        const appId = window.id;
        const app = ALL_APPS.find((a) => a.id === appId);
        const finalPos = positions[appId] || { x: 100, y: 100 };
        if (!app) return null;

        const windowWidth = 600;
        const windowHeight = 400;
        const iconRect = window.fromRect;

        const startX = iconRect ? iconRect.left + (iconRect.width / 2) - (windowWidth / 2) : finalPos.x;
        const startY = iconRect ? iconRect.top + (iconRect.height / 2) - (windowHeight / 2) : finalPos.y;

        const isInitial = windowAnimationState[appId] === "initial";

        return (
          <div
            key={appId}
            className={winStyles.windowFrame}
            // 💡 클릭하면 맨 앞으로 가져옴
            onMouseDown={() => bringToFront(appId)} 
            style={{
              // 💡 index가 곧 Z-index가 됨 (배열의 뒤에 있을수록 숫자가 커짐)
              zIndex: 100 + index, 
              position: "absolute",
              transform: isInitial
                ? `translate(${startX}px, ${startY}px) scale(0.01)`
                : `translate(${finalPos.x}px, ${finalPos.y}px) scale(1)`,
              opacity: isInitial ? 0 : 1,
              transformOrigin: "center center",
            } as React.CSSProperties}
          >
            <div className={winStyles.titleBar} onMouseDown={(e) => onMouseDown(e, appId)}>
              <div className={winStyles.trafficLights}>
                <button onClick={(e) => { e.stopPropagation(); closeWindow(appId); }} className={`${winStyles.dot} ${winStyles.close}`} />
                <div className={`${winStyles.dot} ${winStyles.minimize}`} />
                <div className={`${winStyles.dot} ${winStyles.maximize}`} />
              </div>
              <div className={winStyles.titleText}>{app.label}</div>
            </div>

            <div className={winStyles.content}>
              {WINDOW_COMPONENTS[appId] || (
                <div className="p-4 text-white/20 text-center">준비 중인 페이지입니다.</div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}