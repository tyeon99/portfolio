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
    { label: "이력서 다운로드", action: "download" },
    { label: "GitHub 바로가기", action: "link", url: "https://github.com/tyeon99" },
    { label: "이메일 복사", action: "copy" },
  ],
  편집: [
    { label: "다크모드 전환", action: "theme" },
    { label: "배경화면 변경", action: "wallpaper" },
  ],
  보기: [
    { label: "기술 스택", action: "open_skills" },
    { label: "프로젝트 목록", action: "open_projects" },
    { label: "전체 화면", action: "fullscreen" },
  ],
  도움말: [
    { label: "태연 OS 정보", action: "about" },
    { label: "조작 방법", action: "guide" },
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

// 💡 2. 파라미터에서 { onOpenApp } 받아오기
export default function TopBar({ onOpenApp }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
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
      case "link":
        if (item.url) window.open(item.url, "_blank");
        break;
      
      case "copy":
        const email = "xodus170@naver.com";
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(email);
            alert("이메일 주소가 복사되었습니다.");
          } catch (err) { console.error("복사 실패:", err); }
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = email;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
            alert("이메일 주소가 복사되었습니다.");
          } catch (err) { console.error("복사 실패:", err); }
          document.body.removeChild(textArea);
        }
        break;

      case "download":
        alert("이력서 다운로드를 시작합니다.");
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

      // 💡 3. alert 지우고 실제 창 열기 함수 연결
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

      case "about":
        alert("🍎 TaeYeon OS v1.0.0\n\n프론트엔드 개발자 김태연의 포트폴리오 시스템입니다.\nStack: Next.js 15, TypeScript, Tailwind CSS");
        break;

      case "guide":
        alert("💡 조작 가이드\n\n1. 상단 메뉴바를 통해 시스템 설정을 제어하세요.\n2. 바탕화면 아이콘을 더블 클릭하여 앱을 실행하세요.\n3. 하단 Dock을 통해 빠른 실행이 가능합니다.");
        break;

      default:
        console.log("알 수 없는 액션:", item.action);
        break;
    }
    setActiveMenu(null);
  };

  const formatTime = (date: Date) => {
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
        <span>{isMounted ? formatTime(currentTime) : "..."}</span>
      </div>
    </div>
  );
}