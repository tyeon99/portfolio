"use client";

import React from "react";
import { 
  Code2, 
  Layers, 
  Palette, 
  Cpu, 
  Wrench 
} from "lucide-react";
import styles from "@/assets/css/windows/skills.module.css";

const SKILL_DATA = [
  {
    category: "Languages & Core",
    icon: <Code2 className="text-yellow-400" />,
    skills: [
      { name: "HTML/CSS", level: "Advanced", desc: "웹 표준 및 시맨틱 마크업 준수" },
      { name: "JavaScript", level: "Advanced", desc: "ES6+ 문법 및 비동기 프로그래밍 숙련" },
      { name: "TypeScript", level: "Intermediate", desc: "타입 안정성을 고려한 인터페이스 설계" },
    ]
  },
  {
    category: "Frameworks & Library",
    icon: <Layers className="text-blue-400" />, // 💡 Layers 아이콘 사용
    skills: [
      { name: "Vue / Nuxt.js", level: "Intermediate", desc: "컴포지션 API 활용 및 범용적인 뷰 설계" },
      { name: "React / Next.js", level: "Advanced", desc: "App Router 기반의 SSR/SSG 프로젝트 경험" },
    ]
  },
  {
    category: "Styling Solutions",
    icon: <Palette className="text-pink-400" />,
    skills: [
      { name: "Tailwind CSS", level: "Advanced", desc: "유틸리티 퍼스트 기반의 빠른 UI 구현" },
      { name: "SCSS", level: "Intermediate", desc: "모듈화된 스타일링 및 믹스인 활용" },
    ]
  },
  {
    category: "Data & State",
    icon: <Cpu className="text-green-400" />, // 💡 Cpu 아이콘 사용
    skills: [
      { name: "Zustand / Pinia", level: "Intermediate", desc: "전역 상태 관리 아키텍처 구현" },
      { name: "React Query", level: "Intermediate", desc: "서버 데이터 동기화 및 캐싱 관리" },
    ]
  },
  {
    category: "Design & Tools",
    icon: <Wrench className="text-gray-400" />,
    skills: [
      { name: "Figma", level: "Intermediate", desc: "디자인 시스템 이해 및 UI 협업" },
      { name: "Git / GitHub", level: "Advanced", desc: "Git-flow 전략을 통한 협업 경험" },
    ]
  }
];

export default function SkillsWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Technical Skills</h2>
        <p className={styles.subTitle}>프론트엔드 개발자로서 다룰 수 있는 기술 생태계입니다.</p>
      </div>

      <div className={styles.skillsGrid}>
        {SKILL_DATA.map((group, idx) => (
          <div key={idx} className={styles.groupWrapper}>
            <div className={styles.categoryHeader}>
              {group.icon}
              <span className={styles.categoryLabel}>{group.category}</span>
            </div>

            <div className={styles.cardList}>
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className={styles.skillCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.skillName}>{skill.name}</h3>
                    <span className={styles.levelBadge}>{skill.level}</span>
                  </div>
                  <p className={styles.description}>{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}