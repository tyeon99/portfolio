/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Github, BookMarked, ExternalLink, Activity, Loader2 } from "lucide-react";
import styles from "@/assets/css/windows/github.module.css";

export default function GithubWindow() {
  const [isGrassLoading, setIsGrassLoading] = useState(true);

  const pinnedRepos = [
    { 
      name: "ws_store", 
      desc: "Vue.js 기반의 과일 스토어 관리 및 상품 리스트 시스템", 
      lang: "Vue", 
      color: "#41b883", 
    },
    { 
      name: "portfolio", 
      desc: "Next.js와 TypeScript로 구현한 macOS 스타일 인터랙티브 포트폴리오", 
      lang: "TypeScript", 
      color: "#3178c6", 
    },
  ];

  return (
    <div className={styles.container}>
      {/* 1. 프로필 헤더 */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <img src="https://github.com/tyeon99.png" alt="Profile" className="rounded-full" />
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.userName}>김태연 (tyeon99)</span>
          <span className={styles.userHandle}>Frontend Developer</span>
          <div className="flex gap-2 mt-1">
            <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded font-medium">
              Ready to Work
            </span>
          </div>
        </div>
      </div>

      {/* 2. 💡 실시간 잔디 (GitHub Contribution Graph) */}
      <div className={styles.contributionWrapper}>
        <h3 className={styles.sectionTitle}>
          <Activity size={12} /> Contributions
        </h3>
        
        <div className={styles.grassContainer}>
          {isGrassLoading && (
            <div className={styles.grassLoader}>
              <Loader2 size={16} className="animate-spin text-green-500" />
              <span>잔디 심는 중... 🌿</span>
            </div>
          )}
          <img 
            src="https://ghchart.rshah.org/tyeon99"
            alt="tyeon99's Github Chart"
            className={`${styles.grassImage} ${isGrassLoading ? styles.hidden : styles.visible}`}
            onLoad={() => setIsGrassLoading(false)} // 💡 로드 완료 시 로딩 해제
          />
        </div>
      </div>

      {/* 3. 주요 저장소 (Pinned) */}
      <div className="space-y-3">
        <h3 className={styles.sectionTitle}>
          <BookMarked size={12} /> Pinned Repositories
        </h3>
        <div className={styles.repoGrid}>
          {pinnedRepos.map((repo, i) => (
            <div 
              key={i} 
              className={styles.repoCard}
              onClick={() => window.open(`https://github.com/tyeon99/${repo.name}`, "_blank")}
            >
              <div className={styles.repoName}>
                <BookMarked size={14} /> {repo.name}
              </div>
              <p className={styles.repoDesc}>{repo.desc}</p>
              <div className={styles.repoFooter}>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.color }} /> 
                  {repo.lang}
                </span>
                <span>Updated recently</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 전체 방문 버튼 */}
      <button 
        className={styles.githubBtn}
        onClick={() => window.open("https://github.com/tyeon99", "_blank")}
      >
        <Github size={18} />
        <span>View more projects on GitHub</span>
        <ExternalLink size={14} />
      </button>
    </div>
  );
}