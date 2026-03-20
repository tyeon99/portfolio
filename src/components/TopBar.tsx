/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect } from "react";
import { Command, Wifi, BatteryMedium } from "lucide-react";
import styles from "@/assets/css/topbar.module.css";

// 💡 1. 여기에 인터페이스 추가 (창 여는 함수 타입 정의)
interface TopBarProps {
  onOpenApp?: (id: string, rect: DOMRect | null) => void;
}

const MENU_DATA = {
  파일: [
    { label: "이력서 바로보기", action: "view_resume" },
    { label: "이력서 다운로드", action: "download" },
    { label: "GitHub 바로가기", action: "link", url: "https://github.com/tyeon99" },
    { label: "이메일 복사", action: "copy" },
  ],
  편집: [
    { label: "다크모드 전환", action: "theme" },
    { label: "배경화면 변경", action: "wallpaper" },
  ],
  보기: [
    { label: "자기소개", action: "open_about" },
    { label: "프로젝트 목록", action: "open_projects" },
    { label: "기술 스택", action: "open_skills" },
    { label: "전체 화면", action: "fullscreen" },
  ],
  도움말: [
    { label: "태연 OS 정보", action: "open_system" },
    { label: "조작 방법", action: "open_guide" },
  ],
};

const WALLPAPERS = [
  "/portfolio/img/bg01.jpg",
  "/portfolio/img/bg02.jpg",
  "/portfolio/img/bg03.jpg",
  "/portfolio/img/bg04.jpg",
  "/portfolio/img/bg05.jpg",
  "/portfolio/img/bg06.jpg",
];

const RESUME_PATH = "/portfolio/pdf/[3년차]프론트엔드_김태연_이력서.pdf";

// 💡 2. 파라미터에서 { onOpenApp } 받아오기
export default function TopBar({ onOpenApp }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());

    WALLPAPERS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener("click", closeMenu);
    return () => {
      clearInterval(timer);
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleAction = async (item: { label: string; action: string; url?: string }) => {
    switch (item.action) {
      case "view_resume":
        window.open(RESUME_PATH, "_blank");
        break;

      case "link":
        if (item.url) window.open(item.url, "_blank");
        break;
      
      case "copy":
        const email = "xodus170@naver.com";
        try {
          await navigator.clipboard.writeText(email);
          setCopyStatus(true);
          setTimeout(() => setCopyStatus(false), 2000);
        } catch (err) {
          console.error("복사 실패:", err);
        }
        break;

      case "download":
        const link = document.createElement("a");
        link.href = "/portfolio/pdf/[3년차]프론트엔드_김태연_이력서.pdf";
        link.download = "[3년차]프론트엔드_김태연_이력서.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case "theme":
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        alert(isDark ? "다크 모드가 활성화되었습니다." : "라이트 모드가 활성화되었습니다.");
        break;

      case "wallpaper":
        const randomImg = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)];
        document.documentElement.style.setProperty("--bg-image", `url('${randomImg}')`);
        break;

      case "open_about":
        onOpenApp?.("about", null);
        break;

      case "open_skills":
        onOpenApp?.("skills", null);
        break;

      case "open_projects":
        onOpenApp?.("projects", null);
        break;

      case "fullscreen":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        break;

      case "open_system":
        onOpenApp?.("system", null); // 시스템 정보 전용 ID
        break;

      case "open_guide":
        onOpenApp?.("guide", null); // 가이드 전용 ID
        break;

      default:
        console.log("알 수 없는 액션:", item.action);
        break;
    }
    setActiveMenu(null);
  };

  const formatTime = (date: Date) => {
    if (!date) return "...";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekDay = weekDays[date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}월 ${day}일 (${weekDay}) ${hours}:${minutes}`;
  };

  const menuList = Object.keys(MENU_DATA) as Array<keyof typeof MENU_DATA>;

  return (
    <div className={styles.topBarContainer}>
      {/* 복사 완료 토스트메세지 */}
      <div className={`${styles.copyToast} ${copyStatus ? styles.show : ""}`}>
        Copied!
      </div>
      <div className={styles.leftMenu}>
        <Command size={14} className="cursor-pointer" />
        <span className="font-bold cursor-pointer ml-1">TaeYeon</span>

        {menuList.map((menu) => (
          <div key={menu} className="relative">
            <span
              className={`${styles.menuItem} ${activeMenu === menu ? "bg-white/20" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === menu ? null : menu);
              }}
            >
              {menu}
            </span>

            {activeMenu === menu && (
              <div className={styles.dropdown}>
                {MENU_DATA[menu].map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => handleAction(item)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.rightMenu}>
        <Wifi size={14} />
        <BatteryMedium size={14} />
        <span>{isMounted && currentTime ? formatTime(currentTime) : "..."}</span>
      </div>
    </div>
  );
}