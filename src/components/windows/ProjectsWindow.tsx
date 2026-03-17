"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Briefcase, 
  FolderGit2, 
  Calendar, 
  UserCheck, 
  Code2, 
  Terminal, 
  Globe, 
  Github,
} from "lucide-react";
import styles from "@/assets/css/windows/projects.module.css";

const PROJECT_DATA = [
  {
    id: "wolsang",
    type: "Personal",
    title: "월상농원 (브랜드 스토어 & 관리자)",
    period: "2026.01 ~ 현재",
    role: "기획, 디자인, 프론트엔드 개발",
    tech: ["Vue 3", "Nuxt.js", "TypeScript", "Tailwind CSS", "Pinia"],
    links: [
      { label: "URL", url: "https://wsfarm.co.kr", icon: <Globe size={14} /> },
      { label: "GitHub", url: "https://github.com/tyeon99/ws_store", icon: <Github size={14} /> }
    ],
    summary: "부모님이 운영하시는 상주 농장의 과일 직거래를 위해 만든 D2C 커머스입니다. 단순히 물건을 파는 것을 넘어, 여름과 겨울이라는 농장의 시즌감을 사이트 디자인에 즉시 반영할 수 있는 테마 시스템과 실사용자가 겪을 수 있는 장바구니 이탈 문제를 해결하는 데 집중했습니다.",
    images: ["/portfolio/img/projects/wolsang-1.jpg"],
    achievements: [
      "API 호출마다 토큰을 일일이 넣지 않도록 공통 fetch 함수를 만들어 인증 로직을 한 곳에서 관리했습니다.",
      "로그인 안 한 상태로 장바구니에 담은 상품이 로그인 후에도 사라지지 않고 서버 데이터와 합쳐지도록 로직을 설계했습니다.",
      "매번 디자인을 새로 고치지 않고 CSS 변수만 바꿔서 사이트 분위기(여름/겨울)를 통째로 바꿀 수 있는 테마 스위칭 기능을 넣었습니다.",
      "관리자 페이지는 메뉴가 늘어나도 코드가 복잡해지지 않게 동적 컴포넌트 구조로 만들어 유지보수 편의성을 높였습니다."
    ],
    codeSnippet: `// 1. 매번 반복되는 인증 처리를 하나로 묶기
export const useMainFetch = (url, options = {}) => {
  return $fetch(url, {
    ...options,
    onRequest({ options }) {
      const { userToken } = useMainAuthStore();
      if (userToken) {
        options.headers.set('Authorization', \`Bearer \${userToken}\`);
      }
    },
    onResponseError({ response }) {
      // 세션 만료 시 로그인 페이지로 튕기기 전에 안내 모달 띄우기
      if (response.status === 401) {
        useModalStore().openAlert('로그인이 필요합니다.', () => useMainAuthStore().logout());
      }
    }
  });
};

// 2. CSS 변수 기반으로 시즌 테마 한 번에 갈아끼우기
const toggleSeason = () => {
  currentSeason.value = currentSeason.value === 'summer' ? 'winter' : 'summer';
  document.body.setAttribute('data-season', currentSeason.value);
};`
  },
  {
    id: "os",
    type: "Personal",
    title: "TaeYeon OS (포트폴리오)",
    period: "2026.03",
    role: "프론트엔드 개발 (1인)",
    tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "GitHub", url: "https://github.com/tyeon99/portfolio", icon: <Github size={14} /> }
    ],
    summary: "프론트엔드 개발자로서의 기술적 지향점을 보여주는 시스템형 포트폴리오입니다. Next.js의 App Router와 하이드레이션 최적화를 목표로 제작되었습니다.",
    images: ["/portfolio/img/projects/os-1.jpg"],
    achievements: [
      "isMounted 패턴을 통한 SSR/CSR 간 하이드레이션 에러 원천 차단",
      "이미지 프리로딩 및 마운트 시점 동기화로 부팅 시 '화이트 플래시' 해결",
      "GitHub Actions를 활용한 자동 빌드/배포(CI/CD) 파이프라인 구축"
    ],
    codeSnippet: `// Hydration Error 방지를 위한 Client-side Guard
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true); // 브라우저 마운트 완료 후 렌더링 허용
}, []);

if (!isMounted) return null; // 서버 사이드와 클라이언트 사이드의 돔 트리 일치`
  },
  {
    id: "kiwoom",
    type: "Work",
    title: "키우Me (AI 주식 챗봇)",
    period: "2024.10 ~ 2025.12",
    role: "프론트엔드 시스템 구축",
    tech: ["Vue.js", "JavaScript", "LLM API", "Axios"],
    summary: "키움증권 AI 주식 챗봇 서비스입니다. 대량의 실시간 데이터를 컴포넌트화하고 하이브리드 앱 웹뷰 환경에서의 최적화를 수행했습니다.",
    images: ["/portfolio/img/projects/kium-1.jpg"],
    achievements: [
      "응답 데이터 유형별 동적 컴포넌트 설계로 개발 리드타임 30% 단축",
      "스켈레톤 UI 도입으로 CLS 현상 방지 및 사용자 체감 속도 개선",
      "iOS/Android 웹뷰 Safe Area 레이아웃 대응 및 최적화"
    ],
    codeSnippet: `// AI 응답 타입에 따른 동적 컴포넌트 렌더링 (Vue.js)
<template>
  <div class="chat-message">
    <component 
      :is="messageType === 'chart' ? StockChart : TextContent"
      :data="apiResponseData"
    />
  </div>
</template>`
  },
  {
    id: "hama",
    type: "Work",
    title: "하마터면 (보이스피싱 체험)",
    period: "2025.04 ~ 현재",
    role: "프론트엔드 UI/UX 고도화",
    tech: ["Vue.js", "JavaScript", "STT API"],
    links: [
      { label: "URL", url: "https://wsfarm.co.kr", icon: <Globe size={14} /> }
    ],
    summary: "금융 취약계층을 위한 보이스피싱 예방 교육 서비스입니다. 실제 메신저와 흡사한 타이핑 인터랙션과 음성 대화 인터페이스를 구현했습니다.",
    images: ["/portfolio/img/projects/hama-1.jpg"],
    achievements: [
      "정교한 타이핑 애니메이션 및 메시지 딜레이 제어로 리얼리티 극대화",
      "데이터 기반 시나리오 구조화로 콘텐츠 유지보수성 40% 향상",
      "음성 인식(STT) 연동으로 고령층을 위한 접근성 기반 UI 강화"
    ],
    codeSnippet: `// 실제 메신저 리얼리티를 위한 타이핑 인터랙션 로직
const startTyping = (fullText: string) => {
  let index = 0;
  const timer = setInterval(() => {
    displayText.value += fullText[index++];
    if (index === fullText.length) {
      clearInterval(timer);
      scrollToBottom(); // 대화창 자동 스크롤
    }
  }, 100);
};`
  },
  {
    id: "master",
    type: "Work",
    title: "마스터클래스 교육 플랫폼",
    period: "2025.03 ~ 2025.04",
    role: "프론트엔드 환경 세팅",
    tech: ["Vue.js", "Tailwind CSS", "Axios"],
    links: [
      { label: "URL", url: "https://masterclass.thinkpool.com/", icon: <Globe size={14} /> }
    ],
    summary: "대규모 학습 데이터를 시각화하는 교육 플랫폼입니다. 관리자 권한별 제어와 실시간 데이터 대시보드 구축을 담당했습니다.",
    images: ["/portfolio/img/projects/master-1.jpg"],
    achievements: [
      "Tailwind CSS 도입으로 일관된 UI 구축 및 스타일 작성 시간 단축",
      "Navigation Guard를 활용한 등급별 권한 라우팅 및 페이지 보안 강화",
      "공통 통신 모듈 설계로 전역 에러 핸들링 및 API 최적화"
    ],
    codeSnippet: `// 권한별 접근 제어를 위한 Navigation Guard
router.beforeEach((to, from, next) => {
  const userRole = authStore.getUserRole();
  
  if (to.meta.requiresAdmin && userRole !== 'ADMIN') {
    alert('접근 권한이 없습니다.');
    return next('/dashboard');
  }
  next();
});`
  },
  {
    id: "thinkpool",
    type: "Work",
    title: "씽크풀 브랜드 사이트",
    period: "2024.05 ~ 2024.09",
    role: "웹/모바일 프론트엔드 개발",
    tech: ["Vue.js", "jQuery", "SEO"],
    links: [
      { label: "URL", url: "https://info.thinkpool.com/", icon: <Globe size={14} /> }
    ],
    summary: "기업 소개 페이지 개편 프로젝트입니다. 레거시 코드 리팩토링과 검색 엔진 최적화(SEO)를 통해 유입량을 크게 증대시켰습니다.",
    images: ["/portfolio/img/projects/think-1.jpg"],
    achievements: [
      "시맨틱 마크업 적용으로 Lighthouse SEO 95점 달성 (유입량 45% 증가)",
      "jQuery 레거시의 컴포넌트화 리팩토링으로 코드 안정성 25% 향상",
      "운영 생산성 향상을 위한 콘텐츠 관리 시스템(CMS) 인터페이스 구축"
    ],
    codeSnippet: `<article class="company-vision">
  <header>
    <h1 class="title">기업 가치 및 비전</h1>
  </header>
  <section class="content">
    <p>씽크풀은 금융 AI 기술을 선도하는 기업입니다.</p>
  </section>
</article>`
  },
  {
    id: "maintenance",
    type: "Work",
    title: "주요 서비스 운영 및 유지보수",
    period: "2022.01 ~ 현재",
    role: "UI/UX 고도화 및 퍼블리싱",
    tech: ["HTML5", "SCSS", "JavaScript"],
    summary: "다양한 금융 서비스 및 마케팅 사이트 운영을 담당하며 스타일 시스템 표준화와 접근성 강화를 주도했습니다.",
    images: ["/portfolio/img/projects/main-1.jpg"],
    achievements: [
      "SCSS 기반의 믹스인(Mixin) 라이브러리 구축으로 작업 효율 50% 향상",
      "Vanilla JS 기반의 재사용 가능한 공통 모달/슬라이더 라이브러리 구현",
      "웹 표준 및 웹 접근성 가이드 준수로 크로스 브라우징 최적화"
    ],
    codeSnippet: `// 유지보수 생산성 향상을 위한 SCSS 반응형 Mixin 아키텍처
@mixin mobile {
  @media (max-width: 768px) {
    @content;
  }
}

.product-card {
  width: 25%;
  @include mobile {
    width: 100%; // 모바일 환경 대응
  }
}`
  }
];

export default function ProjectsWindow() {
  const [activeId, setActiveId] = useState(PROJECT_DATA[0].id);
  const activeProject = PROJECT_DATA.find((p) => p.id === activeId) || PROJECT_DATA[0];
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentAreaRef.current) {
      // 상세 영역의 스크롤을 최상단(0)으로 즉시 이동
      contentAreaRef.current.scrollTop = 0;
    }
  }, [activeId]); // activeId가 변경될 때마다 감시

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Projects</h2>
        <div className={styles.projectList}>
          {PROJECT_DATA.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveId(project.id)}
              className={`${styles.projectItem} ${activeId === project.id ? styles.activeItem : ""}`}
            >
              {project.type === "Work" ? <Briefcase size={16} className="text-blue-400" /> : <FolderGit2 size={16} className="text-purple-400" />}
              <div className="text-left overflow-hidden">
                <p className={styles.itemTitle}>{project.title}</p>
                <p className={styles.itemType}>{project.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div ref={contentAreaRef} className={styles.contentArea}>
        <div className={styles.imageGallery}>
          {activeProject.images.map((img, idx) => (
            <div key={idx} className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <span>Image: {img}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.headerTitleRow}>
            <h1 className={styles.detailTitle}>{activeProject.title}</h1>
            <div className={styles.linkGroup}>
              {activeProject.links?.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <p className={styles.detailSummary}>{activeProject.summary}</p>
          
          <div className={styles.metaInfo}>
            <span className={styles.metaBadge}><Calendar size={14} /> {activeProject.period}</span>
            <span className={styles.metaBadge}><UserCheck size={14} /> {activeProject.role}</span>
          </div>

          <div className={styles.techStack}>
            <Code2 size={16} className="text-gray-400" />
            {activeProject.tech.map((t, i) => (
              <span key={i} className={styles.techTag}>{t}</span>
            ))}
          </div>

          <div className={styles.codeSection}>
            <div className={styles.sectionHeader}>
              <Terminal size={18} className="text-blue-400" />
              <h3 className={styles.sectionSubtitle}>Logic Insight</h3>
            </div>
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                  <span className={styles.dot} style={{ background: "#ff5f56" }} />
                  <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.dot} style={{ background: "#27c93f" }} />
                </div>
                <span className={styles.terminalTitle}>core-logic.ts</span>
              </div>
              <pre className={styles.codeContent}>
                <code>{activeProject.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className={styles.achievements}>
            <div className={styles.sectionHeader}>
              <Briefcase size={18} className="text-green-400" />
              <h3 className={styles.sectionSubtitle}>Key Achievements</h3>
            </div>
            <ul className={styles.achievementList}>
              {activeProject.achievements.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}