"use client";

import { 
  Settings, 
  Zap, 
  History,
  CheckCircle2,
  MessageSquare,
  Users,
  TrendingUp,
  ExternalLink,
  FileText,
  Download
} from "lucide-react";
import styles from "@/assets/css/windows/about.module.css";

const ABOUT_DATA = {
  profile: {
    name: "김태연",
    role: "Frontend Developer", 
    intro: "탄탄한 퍼블리싱 기본기를 바탕으로 프론트엔드 환경을 구축합니다. 단순한 화면 구현을 넘어 '누구나 예측하고 수정하기 쉬운 체계적인 코드'를 작성하는 데 중점을 둡니다.",
  },
  coreValues: [
    {
      title: "BEM 기반의 체계적 UI 설계",
      desc: "일관성 없는 코드가 초래하는 유지보수의 어려움을 방지하기 위해 BEM 기반의 네이밍 규칙을 적용합니다. 최상단 래퍼부터 하위 요소까지 직관적으로 분리해 스타일 충돌을 막고 확장성을 높입니다.",
      icon: <Settings className="text-blue-400" />
    },
    {
      title: "디테일을 살린 UI/UX 인터랙션",
      desc: "타이핑 애니메이션, 메시지 전송 딜레이, 자동 스크롤 등 실제 메신저와 흡사한 동작을 스크립트로 정교하게 제어하여 가상체험 서비스의 몰입도를 높입니다.",
      icon: <MessageSquare className="text-green-400" />
    },
    {
      title: "적극적인 소통과 대안 제시",
      desc: "Figma를 활용해 예외 케이스를 사전에 파악하고 공통 컴포넌트를 역제안합니다. 기술적인 제약에 부딪혀도 '안 된다'고 하기보다 현실적인 대안을 찾아 부서 간 마찰을 줄이고 일정을 안정적으로 맞춥니다.",
      icon: <Users className="text-purple-400" />
    },
    {
      title: "프레임워크에 얽매이지 않는 유연함",
      desc: "실무 기술에 머물지 않고 꾸준히 새로운 프레임워크를 학습합니다. Vue를 넘어 React와 Next.js로 프로젝트를 구축하며, 어떤 환경에서도 유연하게 최적의 코드를 설계하는 적응력을 키우고 있습니다.",
      icon: <TrendingUp className="text-yellow-400" />
    }
  ],
  strengths: [
    "하이브리드 앱 웹뷰(WebView) 렌더링 최적화 및 크로스 브라우징 이슈 해결",
    "Tailwind CSS, SCSS 등을 활용한 효율적인 스타일 시스템 및 공통 UI 구축",
    "Vue 3/Nuxt 기반 프로젝트 구축 및 React/Next.js 환경으로의 기술 스택 확장"
  ],
  growthLog: [
    { 
      period: "Phase 3. Expansion", 
      event: "React / Next.js 기술 스택 확장",
      desc: "Vue를 넘어 React와 Next.js를 도입하여 컴포넌트 모듈화 및 데이터 상태 관리 로직을 구축하며 프론트엔드 역량 강화" 
    },
    { 
      period: "Phase 2. Frontend System", 
      event: "Vue.js 기반 프론트엔드 시스템 구축",
      desc: "AI 챗봇, 보이스피싱 가상체험 등 핵심 서비스의 화면단 설계 및 하이브리드 웹뷰(WebView) 렌더링 최적화" 
    },
    { 
      period: "Phase 1. UI/UX Foundation", 
      event: "탄탄한 퍼블리싱 기본기 및 마크업 고도화",
      desc: "10여 개 이상의 전사 서비스 유지보수를 거치며 크로스 브라우징 대응 및 BEM 기반의 스타일 코드 모듈화 정립" 
    }
  ]
};

export default function AboutWindow() {
  const RESUME_URL = "/portfolio/pdf/[3년차]프론트엔드_김태연_이력서.pdf";

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

      {/* 이력서 다운로드/바로보기 */}
      <section className={styles.resumeSection}>
        <div className={styles.resumeCard}>
          <div className={styles.resumeText}>
            <FileText size={20} className="text-blue-400" />
            <span>상세한 이력이 궁금하시다면 이력서를 확인해 보세요.</span>
          </div>
          <div className={styles.buttonGroup}>
            <a 
              href={RESUME_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.viewButton}
            >
              <ExternalLink size={16} />
              이력서 바로보기
            </a>
            <a 
              href={RESUME_URL} 
              download="[3년차]프론트엔드_김태연_이력서.pdf" 
              className={styles.downloadButton}
            >
              <Download size={16} />
              다운로드
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}