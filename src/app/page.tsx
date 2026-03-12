"use client";

import React, { useState } from "react";
import LockScreen from "@/components/LockScreen";
import TopBar from "@/components/TopBar";
import Dock from "@/components/Dock";
import DesktopIntro from "@/components/Intro";
import DesktopIcons, { ALL_APPS } from "@/components/DesktopIcons";
import WindowManager from "@/components/WindowManager";

export default function Home() {
  // 잠금 화면
  const [isLocked, setIsLocked] = useState(true);

  const [openWindowData, setOpenWindowData] = useState<{ id: string; fromRect: DOMRect | null }[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [sizes, setSizes] = useState<Record<string, { w: number; h: number }>>({});
  const [windowAnimationState, setWindowAnimationState] = useState<Record<string, "initial" | "final">>({});
  const [maximizedApps, setMaximizedApps] = useState<string[]>([]);

  // 라벨 매핑용 데이터
  const appLabels = ALL_APPS.reduce((acc, app) => ({ ...acc, [app.id]: app.label }), {});

  const handleOpenApp = (id: string, rect: DOMRect | null) => {
    if (!openWindowData.some((win) => win.id === id)) {
      setOpenWindowData((prev) => [...prev, { id, fromRect: rect }]);
      const count = openWindowData.length;
      setPositions((prev) => ({ ...prev, [id]: { x: 150 + count * 40, y: 100 + count * 40 } }));
      setSizes((prev) => ({ ...prev, [id]: { w: 1000, h: 600 } }));
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
      {/* 💡 잠금화면이 true일 때만 렌더링 */}
      {isLocked && <LockScreen onStart={() => setIsLocked(false)} />}

      <TopBar onOpenApp={handleOpenApp} />
      <DesktopIntro />
      
      {/* 1. 아이콘 레이어 */}
      <DesktopIcons onOpenApp={handleOpenApp} />

      {/* 2. 윈도우 관리 레이어 (분리 완료!) */}
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

      {/* 3. 독 레이어 */}
      <Dock onOpenApp={handleOpenApp} />
    </main>
  );
}