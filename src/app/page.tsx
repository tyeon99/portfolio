"use client";

import React, { useState } from "react";
import LockScreen from "@/components/LockScreen";
import TopBar from "@/components/TopBar";
import Dock from "@/components/Dock";
import DesktopIntro from "@/components/Intro";
import DesktopIcons, { ALL_APPS } from "@/components/DesktopIcons";
import WindowManager from "@/components/WindowManager";

const APP_CONFIG: Record<string, { w: number; h: number }> = {
  system: { w: 380, h: 520 },
  guide: { w: 550, h: 450 },
  memo: { w: 400, h: 450 },
  default: { w: 1000, h: 600 }
};

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [openWindowData, setOpenWindowData] = useState<{ id: string; fromRect: DOMRect | null }[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [sizes, setSizes] = useState<Record<string, { w: number; h: number }>>({});
  const [windowAnimationState, setWindowAnimationState] = useState<Record<string, "initial" | "final">>({});
  const [maximizedApps, setMaximizedApps] = useState<string[]>([]);

  const appLabels = ALL_APPS.reduce((acc, app) => ({ ...acc, [app.id]: app.label }), {} as Record<string, string>);

  const handleOpenApp = (id: string, rect: DOMRect | null) => {
    if (!openWindowData.some((win) => win.id === id)) {
      const config = APP_CONFIG[id as keyof typeof APP_CONFIG] || APP_CONFIG.default;
      const count = openWindowData.length;

      setOpenWindowData((prev) => [...prev, { id, fromRect: rect }]);
      
      setPositions((prev) => ({ 
        ...prev, 
        [id]: { x: 150 + count * 40, y: 100 + count * 40 } 
      }));

      setSizes((prev) => ({ 
        ...prev, 
        [id]: { w: config.w, h: config.h } 
      }));

      setWindowAnimationState((prev) => ({ ...prev, [id]: "initial" }));
      setTimeout(() => setWindowAnimationState((prev) => ({ ...prev, [id]: "final" })), 50);
    } else {
      bringToFront(id);
    }
  };

  const closeWindow = (id: string) => {
    setWindowAnimationState((prev) => ({ ...prev, [id]: "initial" }));
    setTimeout(() => {
      setOpenWindowData((prev) => prev.filter((app) => app.id !== id));
      setMaximizedApps((prev) => prev.filter(appId => appId !== id));
      setPositions(prev => { const n = {...prev}; delete n[id]; return n; });
      setSizes(prev => { const n = {...prev}; delete n[id]; return n; });
    }, 400);
  };

  const bringToFront = (id: string) => {
    setOpenWindowData((prev) => {
      const target = prev.find((w) => w.id === id);
      return target ? [...prev.filter((w) => w.id !== id), target] : prev;
    });
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {isLocked && <LockScreen onStart={() => setIsLocked(false)} />}

      <TopBar onOpenApp={handleOpenApp} />
      <DesktopIntro />
      
      <DesktopIcons onOpenApp={handleOpenApp} />

      <WindowManager 
        openWindowData={openWindowData}
        positions={positions}
        sizes={sizes}
        windowAnimationState={windowAnimationState}
        maximizedApps={maximizedApps}
        setPositions={setPositions}
        setSizes={setSizes}
        setMaximizedApps={setMaximizedApps}
        onCloseApp={closeWindow}
        onBringToFront={bringToFront}
        appLabels={appLabels}
      />

      <Dock onOpenApp={handleOpenApp} />
    </main>
  );
}