"use client";

import TopBar from "@/components/TopBar";
import Dock from "@/components/Dock";
import DesktopIntro from "@/components/Intro";
import DesktopIcons from "@/components/DesktopIcons";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 1. 상단바 */}
      <TopBar />
      
      {/* 2. 중앙 인트로 (바탕화면의 일부처럼 작동) */}
      <DesktopIntro />

      {/* 3. 바탕화면 아이콘  */}
      <DesktopIcons />

      {/* 4. 하단 Dock */}
      <Dock />
    </main>
  );
}