/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { FileText, Clock } from "lucide-react";
import styles from "@/assets/css/windows/memo.module.css";

export default function MemoWindow() {
  const [content, setContent] = useState<string>("");
  const [lastSaved, setLastSaved] = useState<string>("");

  // 💡 1. 처음 마운트될 때 기존 메모 불러오기
  useEffect(() => {
    const savedMemo = localStorage.getItem("tyeon_os_memo");
    const savedTime = localStorage.getItem("tyeon_os_memo_time");
    if (savedMemo) setContent(savedMemo);
    if (savedTime) setLastSaved(savedTime);
  }, []);

  // 💡 2. 내용이 바뀔 때마다 실시간 저장 (Auto-save)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setContent(newText);
    
    // 로컬 스토리지에 저장
    localStorage.setItem("tyeon_os_memo", newText);
    
    // 저장 시간 기록
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSaved(now);
    localStorage.setItem("tyeon_os_memo_time", now);
  };

  return (
    <div className={styles.container}>
      {/* 💡 상단: 파일 정보와 저장 시간 */}
      <div className={styles.infoBar}>
        <div className="flex items-center gap-1.5">
          <FileText size={10} className="opacity-50" />
          <span>memo_draft.txt</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={10} className="opacity-50" />
          <span>{lastSaved ? `Last edit ${lastSaved}` : "New Document"}</span>
        </div>
      </div>

      {/* 💡 중단: 실제 글쓰기 영역 */}
      <textarea
        className={styles.textarea}
        placeholder="새로운 메모를 입력해보세요."
        value={content}
        onChange={handleChange}
        autoFocus
      />

      {/* 💡 하단: 통계 정보 */}
      <div className={styles.statusBar}>
        <span>UTF-8</span>
        <span>{content.length} characters · {content.trim() ? content.trim().split(/\s+/).length : 0} words</span>
      </div>
    </div>
  );
}