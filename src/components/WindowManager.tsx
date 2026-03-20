/* eslint-disable react-hooks/refs */
"use client";

import React, { useRef, useEffect } from "react";
import winStyles from "@/assets/css/window.module.css";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import MemoWindow from "@/components/windows/MemoWindow";
import GithubWindow from "@/components/windows/GithubWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import SystemWindow from "@/components/windows/SystemWindow"; // 경로 유지
import GuideWindow from "@/components/windows/GuideWindow";   // 경로 유지

const APP_CONFIG: Record<string, { w: number; h: number; minW: number; minH: number }> = {
  system: { w: 380, h: 520, minW: 300, minH: 400 },
  guide: { w: 550, h: 450, minW: 400, minH: 450 },
  memo: { w: 400, h: 450, minW: 300, minH: 300 },
  default: { w: 1000, h: 600, minW: 800, minH: 500 }
};

const WINDOW_COMPONENTS: Record<string, React.ReactNode> = {
  about: <AboutWindow />,
  projects: <ProjectsWindow />,
  skills: <SkillsWindow />,
  memo: <MemoWindow />,
  github: <GithubWindow />,
  contact: <ContactWindow />,
  system: <SystemWindow />,
  guide: <GuideWindow />,
};

interface WindowManagerProps {
  openWindowData: { id: string; fromRect: DOMRect | null }[];
  positions: Record<string, { x: number; y: number }>;
  sizes: Record<string, { w: number; h: number }>;
  windowAnimationState: Record<string, "initial" | "final">;
  maximizedApps: string[];
  setPositions: React.Dispatch<React.SetStateAction<Record<string, { x: number; y: number }>>>;
  setSizes: React.Dispatch<React.SetStateAction<Record<string, { w: number; h: number }>>>;
  setMaximizedApps: React.Dispatch<React.SetStateAction<string[]>>;
  onCloseApp: (id: string) => void;
  onBringToFront: (id: string) => void;
  appLabels: Record<string, string>;
}

export default function WindowManager({
  openWindowData,
  positions,
  sizes,
  windowAnimationState,
  maximizedApps,
  setPositions,
  setSizes,
  setMaximizedApps,
  onCloseApp,
  onBringToFront,
  appLabels
}: WindowManagerProps) {
  const draggingApp = useRef<string | null>(null);
  const resizingApp = useRef<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ w: 0, h: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const toggleMaximize = (id: string) => {
    if (['system', 'guide'].includes(id)) return;
    
    setMaximizedApps((prev) => 
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (draggingApp.current) {
        const id = draggingApp.current;
        setPositions((prev) => ({
          ...prev,
          [id]: { x: e.clientX - offset.current.x, y: e.clientY - offset.current.y },
        }));
      }

      if (resizingApp.current) {
        const id = resizingApp.current;
        const config = APP_CONFIG[id] || APP_CONFIG.default;
        const deltaX = e.clientX - startPos.current.x;
        const deltaY = e.clientY - startPos.current.y;

        setSizes((prev) => ({
          ...prev,
          [id]: {
            w: Math.max(config.minW, initialSize.current.w + deltaX),
            h: Math.max(config.minH, initialSize.current.h + deltaY),
          },
        }));
      }
    };

    const onMouseUp = () => {
      draggingApp.current = null;
      resizingApp.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [setPositions, setSizes]);

  return (
    <>
      {openWindowData.map((window, index) => {
        const appId = window.id;
        const finalPos = positions[appId] || { x: 100, y: 100 };
        
        const config = APP_CONFIG[appId] || APP_CONFIG.default;
        const currentSize = sizes[appId] || { w: config.w, h: config.h };
        
        const isMaximized = maximizedApps.includes(appId);
        const isInitial = windowAnimationState[appId] === "initial";
        const iconRect = window.fromRect;
        
        const startX = iconRect ? iconRect.left + (iconRect.width / 2) - (currentSize.w / 2) : finalPos.x;
        const startY = iconRect ? iconRect.top + (iconRect.height / 2) - (currentSize.h / 2) : finalPos.y;

        return (
          <div
            key={appId}
            className={winStyles.windowFrame}
            onMouseDown={() => onBringToFront(appId)} 
            style={{
              zIndex: isMaximized ? 99999 : 100 + index,
              position: "absolute",
              transform: isInitial
                ? `translate(${startX}px, ${startY}px) scale(0.01)`
                : isMaximized ? `translate(0px, 0px) scale(1)` : `translate(${finalPos.x}px, ${finalPos.y}px) scale(1)`,
              width: isMaximized ? "100%" : `${currentSize.w}px`,
              height: isMaximized ? "100%" : `${currentSize.h}px`,
              top: isMaximized ? "0" : "auto",
              left: isMaximized ? "0" : "auto",
              opacity: isInitial ? 0 : 1,
              transformOrigin: "center center",
              borderRadius: isMaximized ? "0px" : "12px",
              transition: (resizingApp.current === appId || draggingApp.current === appId) 
                ? "none" 
                : "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            } as React.CSSProperties}
          >
            <div className={winStyles.titleBar} onMouseDown={(e) => {
              onBringToFront(appId);
              if (!isMaximized) {
                draggingApp.current = appId;
                offset.current = { x: e.clientX - finalPos.x, y: e.clientY - finalPos.y };
              }
            }}>
              <div className={winStyles.trafficLights}>
                <button onClick={(e) => { e.stopPropagation(); onCloseApp(appId); }} className={`${winStyles.dot} ${winStyles.close}`} />
                <button onClick={(e) => { e.stopPropagation(); onCloseApp(appId); }} className={`${winStyles.dot} ${winStyles.minimize}`} />
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(appId); }} 
                  className={`${winStyles.dot} ${winStyles.maximize} ${['system', 'guide'].includes(appId) ? 'opacity-30 cursor-not-allowed' : ''}`}
                />
              </div>
              <div className={winStyles.titleText}>{appLabels[appId]}</div>
            </div>

            <div className={winStyles.content}>
              {WINDOW_COMPONENTS[appId]}
            </div>

            {!isMaximized && appId !== 'system' && ( // 시스템창은 리사이징도 막고 싶으면 이렇게 추가
              <div 
                onMouseDown={(e) => {
                  e.stopPropagation();
                  onBringToFront(appId);
                  resizingApp.current = appId;
                  startPos.current = { x: e.clientX, y: e.clientY };
                  initialSize.current = sizes[appId] || { w: config.w, h: config.h };
                }}
                style={{ position: 'absolute', right: 0, bottom: 0, width: '16px', height: '16px', cursor: 'nwse-resize', zIndex: 20 }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}