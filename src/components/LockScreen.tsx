/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "@/assets/css/lockscreen.module.css";

interface LockScreenProps {
  onStart: () => void;
}

export default function LockScreen({ onStart }: LockScreenProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // 슉 올라가는 애니메이션용
  const [isReady, setIsReady] = useState(false); // 이미지 로드중

  const handleStart = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 800);
  }, [isExiting, onStart]);

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());

    // 💡 1. 배경 이미지 선행 로드 (이미지 경로 주의!)
    const img = new Image();
    img.src = "/portfolio/img/bg01.jpg"; 
    img.onload = () => {
      setTimeout(() => setIsReady(true), 0);
    };

    // 💡 2. 실시간 시계 업데이트 (1초마다)
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExiting]);

  // 💡 시간 포맷 함수 (예: 6:30)
  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 💡 날짜 포맷 함수 (예: Wed Aug 20)
  const formatDate = (date: Date) => {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const monthNames = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];

    const weekDay = weekDays[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${weekDay} ${month} ${day}일`;
  };

  return (
    <div className={`${styles.lockContainer} ${isExiting ? styles.slideUp : ""}`}>
      {/* 💡 배경은 전체 블러 처리된 bg01 */}
      <div className={`${styles.backgroundBlur} ${isReady ? styles.fadeIn : styles.fadeOut}`} />

      <div className={`${styles.content} ${isReady ? styles.fadeIn : styles.fadeOut}`}>
        {/* 💡 2. 상단: 크고 굵은 macOS 스타일 시계 */}
        <div className={styles.topSection}>
          <p className={styles.date}>
            {isMounted && currentTime ? formatDate(currentTime) : "--월 --일 (요일)"}
          </p>
          <h1 className={styles.time}>
            {isMounted && currentTime ? formatTime(currentTime) : "00:00"}
          </h1>
        </div>

        {/* 💡 3. 중앙: 자연스럽게 녹아든 조작 가이드 */}
        <div className={styles.guideCard}>
          <h2 className={styles.guideTitle}>💡 GUIDE 💡 </h2>
          <ul className={styles.guideList}>
            <li>상단 메뉴바를 통해 시스템 설정을 제어하세요.</li>
            <li>바탕화면 아이콘을 더블 클릭하여 앱을 실행하세요.</li>
            <li>하단 Dock을 통해 빠른 실행이 가능합니다.</li>
            <li>아래 &apos;Get Started&apos; 버튼 또는 &apos;Enter&apos;를 눌러 시작해 보세요.</li>
          </ul>
        </div>

        {/* 💡 4. 하단: macOS 사자 아이콘 버튼 */}
        <div className={styles.bottomSection}>
          {/* 아바타 */}
          <div className={styles.avatarWrapper} onClick={handleStart}>
            <div className={styles.initialIcon}>T</div>
          </div>

          {/* 로그인 폼 영역 */}
          <div className={styles.loginInputWrapper}>
            <span className={styles.userName}>TaeYeon Kim</span>

            {/* 💡 버튼을 클릭하면 'Enter Password'인 척 하다가 시작되게! */}
            <button className={styles.startButton} onClick={handleStart}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
