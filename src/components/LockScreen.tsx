/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "@/assets/css/lockscreen.module.css";

interface LockScreenProps {
  onStart: () => void;
}

export default function LockScreen({ onStart }: LockScreenProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 💡 터치 스와이프 좌표 추적용 Ref
  const touchStartY = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 800);
  }, [isExiting, onStart]);

  // 💡 모바일 위로 스와이프 감지 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY.current - touchEndY;

    // 위로 50px 이상 스와이프 시 잠금 해제
    if (diffY > 50) {
      handleStart();
    }
    touchStartY.current = null;
  };

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());

    const img = new Image();
    img.src = "/portfolio/img/bg01.jpg"; 
    img.onload = () => {
      setTimeout(() => setIsReady(true), 0);
    };

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
  }, [handleStart]);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const monthNames = [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월"
    ];

    const weekDay = weekDays[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${weekDay} ${month} ${day}일`;
  };

  return (
    <div 
      className={`${styles.lockContainer} ${isExiting ? styles.slideUp : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`${styles.backgroundBlur} ${isReady ? styles.fadeIn : styles.fadeOut}`} />

      <div className={`${styles.content} ${isReady ? styles.fadeIn : styles.fadeOut}`}>
        {/* 상단: 시계 */}
        <div className={styles.topSection}>
          <p className={styles.date}>
            {isMounted && currentTime ? formatDate(currentTime) : "--월 --일 (요일)"}
          </p>
          <h1 className={styles.time}>
            {isMounted && currentTime ? formatTime(currentTime) : "00:00"}
          </h1>
        </div>

        {/* 중앙: 가이드 */}
        <div className={styles.guideCard}>
          <h2 className={styles.guideTitle}>💡 GUIDE 💡</h2>
          <ul className={styles.guideList}>
            <li>상단 메뉴바를 통해 시스템 설정을 제어하세요.</li>
            <li>바탕화면 아이콘을 클릭하여 앱을 실행하세요.</li>
            <li>하단 Dock을 통해 빠른 실행이 가능합니다.</li>
            <li>아래 &apos;Get Started&apos; 버튼 또는 &apos;Enter&apos;를 눌러 시작해 보세요.</li>
          </ul>
        </div>

        {/* 하단: 버튼 및 스와이프 안내 */}
        <div className={styles.bottomSection}>
          <div className={styles.avatarWrapper} onClick={handleStart}>
            <div className={styles.initialIcon}>T</div>
          </div>

          <div className={styles.loginInputWrapper}>
            <span className={styles.userName}>TaeYeon Kim</span>

            <button className={styles.startButton} onClick={handleStart}>
              Get Started
            </button>
          </div>
          
          {/* 모바일용 스와이프 안내 힌트 */}
          <p className={styles.swipeHint}>위로 쓸어올려서 잠금 해제</p>
        </div>
      </div>
    </div>
  );
}