/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Command, Wifi, BatteryMedium } from "lucide-react";
import styles from "@/assets/css/topbar.module.css";

// 각 메뉴별 세부 항목 데이터
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

//  랜덤으로 돌아갈 배경화면 리스트
const WALLPAPERS = [
  "linear-gradient(to bottom right, #1e3a8a, #581c87, #000000)", // 기본
  "linear-gradient(to right, #000428, #004e92)",               // 딥 블루
  "linear-gradient(to right, #0f2027, #203a43, #2c5364)",      // 다크 미드나잇
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",         // 오로라 핑크/블루
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",         // 퍼플 헤이즈
];

export default function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false); // 하이드레이션 에러 방지용
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // 💡 메뉴 밖을 클릭하면 닫히는 로직
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener("click", closeMenu);

    return () => {
      clearInterval(timer);
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  // 🔥 메뉴 클릭 시 실행될 기능 정의
  const handleAction = (item: { label: string; action: string; url?: string }) => {
    switch (item.action) {
      case "link":
        if (item.url) window.open(item.url, "_blank"); // 새 탭에서 열기
        break;
      
      case "copy":
        navigator.clipboard.writeText("xodus170@naver.com");
        alert("이메일 주소가 복사되었습니다.");
        break;

      case "download":
        // 실제 PDF 파일이 public 폴더에 있어야 작동해!
        // const link = document.createElement('a');
        // link.href = '/resume.pdf'; 
        // link.download = '김태연_이력서.pdf';
        // link.click();
        alert("이력서 다운로드를 시작합니다.");
        break;

      case "theme":
        // 다크모드 토글 (html 클래스 제어)
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        alert(isDark ? "다크 모드가 활성화되었습니다." : "라이트 모드가 활성화되었습니다.");
        break;

      case "wallpaper":
        // 🎲 배경화면 랜덤 변경
        const randomBg = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)];
        document.documentElement.style.setProperty("--bg-gradient", randomBg);
        break;

      case "open_skills":
        alert("🛠 '기술 스택' 창을 실행합니다.\n(창 시스템 구현 후 실제 창이 뜹니다!)");
        break;

      case "open_projects":
        alert("💻 '프로젝트 목록' 창을 실행합니다.\n(창 시스템 구현 후 실제 창이 뜹니다!)");
        break;

      case "fullscreen":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        break;

      case "about":
        alert(
          "🍎 TaeYeon OS v1.0.0\n\n" +
          "프론트엔드 개발자 김태연의 포트폴리오 시스템입니다.\n" +
          "Stack: Next.js 15, TypeScript, Tailwind CSS"
        );
        break;

      case "guide":
        alert(
          "💡 조작 가이드\n\n" +
          "1. 상단 메뉴바를 통해 시스템 설정을 제어하세요.\n" +
          "2. 바탕화면 아이콘을 더블 클릭하여 앱을 실행하세요. (준비 중)\n" +
          "3. 하단 Dock을 통해 빠른 실행이 가능합니다. (준비 중)"
        );
        break;

      default:
        console.log("알 수 없는 액션:", item.action);
        break;
    }
    setActiveMenu(null); // 동작 후 메뉴 닫기
  };

  // 🕒 시간 포맷 맞춰주는 함수 (예: 3월 10일 (화) 13:25)
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
    // 모듈에서 정의한 클래스 적용
    <div className={styles.topBarContainer}>
      {/* 왼쪽: 로고 및 기본 메뉴 */}
      <div className={styles.leftMenu}>
        <Command size={14} className="cursor-pointer" />
        <span className="font-bold cursor-pointer">TaeYeon</span>

        {menuList.map((menu) => (
          <div key={menu} className="relative">
            <span
              className={`${styles.menuItem} ${activeMenu === menu ? "bg-white/20" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // 💡 윈도우 클릭 이벤트 전파 방지
                setActiveMenu(activeMenu === menu ? null : menu);
              }}
            >
              {menu}
            </span>

            {/* 🔥 드롭다운 렌더링 */}
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

      {/* 오른쪽: 상태 아이콘 (와이파이, 배터리, 시간) */}
      <div className={styles.rightMenu}>
        <Wifi size={14} />
        <BatteryMedium size={14} />
        <span>{isMounted ? formatTime(currentTime) : "..."}</span>
      </div>
    </div>
  );
}
