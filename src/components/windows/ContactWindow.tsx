"use client";

import React, { useState } from "react";
import { Mail, Github, Copy, Check, ExternalLink } from "lucide-react";
import styles from "@/assets/css/windows/contact.module.css";

export default function ContactWindow() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    // 💡 최신 API 시도
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedType(type);
      } catch (err) {
        console.error("복사 실패:", err);
      }
    } else {
      // 💡 보안 환경이 아닐 때 사용하는 예전 방식 (Fallback)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // 화면에 안 보이게 숨기기
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopiedType(type);
      } catch (err) {
        console.error("복사 실패:", err);
      }
      
      document.body.removeChild(textArea);
    }

    setTimeout(() => setCopiedType(null), 2000);
  };

  const contactData = [
    {
      id: "email",
      label: "Email",
      value: "xodus170@naver.com", 
      icon: <Mail size={20} />,
      action: "copy",
    },
    {
      id: "github",
      label: "GitHub",
      value: "@tyeon99",
      icon: <Github size={20} />,
      action: "link",
      url: "https://github.com/tyeon99",
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Let&apos;s Connect!</h2>
        <p className={styles.subtitle}>현재 새로운 기회에 열려 있습니다. 저에 대해 더 궁금하시다면 언제든 연락주세요.</p>
      </div>

      <div className={styles.contactGrid}>
        {contactData.map((item) => (
          <div
            key={item.id}
            className={styles.contactCard}
            onClick={() => {
              if (item.action === "copy") handleCopy(item.value, item.id);
              else if (item.url) window.open(item.url, "_blank");
            }}
          >
            <div className={`${styles.copyToast} ${copiedType === item.id ? styles.show : ""}`}>
              Copied!
            </div>

            <div className={styles.iconWrapper}>{item.icon}</div>
            
            <div className={styles.info}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>{item.value}</span>
            </div>
            
            {/* 💡 클래스명을 styles.actionIconWrapper 로 교체! */}
            <div className={styles.actionIconWrapper}>
              {item.action === "copy" ? (
                copiedType === item.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />
              ) : (
                <ExternalLink size={14} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-white/20 text-[12px] mt-4">
        © 2026 Kim Tae Yeon. All rights reserved.
      </div>
    </div>
  );
}