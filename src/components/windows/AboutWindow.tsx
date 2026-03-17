"use client";

import { 
  Settings, 
  Zap, 
  History,
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import styles from "@/assets/css/windows/about.module.css";

const ABOUT_DATA = {
  profile: {
    name: "김태연",
    role: "Frontend Developer (Former UI Publisher)",
    intro: "단순한 화면 구현을 넘어 '예측 가능하고 수정하기 쉬운 체계적인 구조'를 설계하는 데 집중합니다.",
  },
  coreValues: [
    {
      title: "BEM 기반의 체계적 UI 설계",
      desc: "스타일 충돌을 방지하고 확장성을 높이는 BEM 네이밍 규칙을 실무에 정착시켰습니다. 최상단 래퍼부터 하위 요소까지 직관적으로 세분화하여 유지보수 효율을 극대화합니다.",
      icon: <Settings className="text-blue-400" />
    },
    {
      title: "리얼리티를 살린 인터랙션",
      desc: "타이핑 애니메이션, 메시지 전송 딜레이, 자동 스크롤 등 실제 서비스와 동일한 햅틱 경험을 스크립트로 정교하게 제어하여 서비스의 몰입도를 높입니다.",
      icon: <MessageSquare className="text-green-400" />
    }
  ],
  strengths: [
    "Figma 기반의 예외 케이스 사전 파악 및 선제적 UI 역제안",
    "웹뷰(WebView) 환경 내 렌더링 최적화 및 레이아웃 파편화 해결",
    "음성 인식(STT) 대화 인터페이스 도입 등 웹 접근성 개선 경험",
    "기술적 제약 상황에서 기획 의도를 살리는 현실적 대안 도출 능력"
  ],
  growthLog: [
    { period: "Next Step", event: "React/Next.js 기반 대규모 시스템 구조화 및 데이터 렌더링 최적화 연구" },
    { period: "2023 - 2025", event: "Vue 3/Nuxt 활용 상태 관리 및 SSR 라이프사이클 심화 (개인 프로젝트 & 실무)" },
    { period: "2022 - 2023", event: "웹 퍼블리셔에서 프론트엔드로 확장, 시맨틱 마크업 및 인터랙션 전문성 확보" }
  ]
};

export default function AboutWindow() {
  return (
    <div className={styles.container}>
      {/* 1. Profile Section */}
      <section className={styles.profileSection}>
        <div className={styles.avatar}>T</div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{ABOUT_DATA.profile.name}</h1>
          <p className={styles.role}>{ABOUT_DATA.profile.role}</p>
          <p className={styles.intro}>&quot;{ABOUT_DATA.profile.intro}&quot;</p>
        </div>
      </section>

      {/* 2. Core Values (자소서 기반) */}
      <div className={styles.sectionGrid}>
        {ABOUT_DATA.coreValues.map((item, idx) => (
          <div key={idx} className={styles.philosophyCard}>
            <div className={styles.cardHeader}>
              {item.icon}
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </div>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Strengths & Growth Log */}
      <div className={styles.bottomGrid}>
        <section className={styles.listSection}>
          <div className={styles.listHeader}>
            <Zap size={18} className="text-yellow-400" />
            <h3 className={styles.listTitle}>Professional Strengths</h3>
          </div>
          <ul className={styles.strengthList}>
            {ABOUT_DATA.strengths.map((s, i) => (
              <li key={i} className={styles.listItem}>
                <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.listSection}>
          <div className={styles.listHeader}>
            <History size={18} className="text-orange-400" />
            <h3 className={styles.listTitle}>Growth Journey</h3>
          </div>
          <div className={styles.timeline}>
            {ABOUT_DATA.growthLog.map((log, i) => (
              <div key={i} className={styles.timelineItem}>
                <span className={styles.timelineDate}>{log.period}</span>
                <p className={styles.timelineEvent}>{log.event}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}