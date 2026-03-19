/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
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
  Loader2
} from "lucide-react";
import styles from "@/assets/css/windows/projects.module.css";

// 💡 Swiper 관련 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PROJECT_DATA = [
  {
    id: "wolsang",
    type: "Personal",
    title: "월상농원 (D2C 커머스 & 어드민)",
    period: "2026.01 ~ 현재",
    role: "기획, 디자인, 프론트엔드 개발 (1인)",
    tech: ["Vue 3", "Nuxt.js", "TypeScript", "Tailwind CSS", "Pinia"],
    imgCode: "01",
    imageCount: 5,
    links: [
      { label: "URL", url: "https://wsfarm.co.kr", icon: <Globe size={14} /> },
      { label: "GitHub", url: "https://github.com/tyeon99/ws_store", icon: <Github size={14} /> }
    ],
    summary: "상주 농가 직거래를 위한 D2C 커머스 플랫폼입니다. 단순 커머스 기능을 넘어 '시즌 테마 시스템'과 '장바구니 유지 로직' 등 실사용자 편의성 개선을 목표로 개발 중입니다.",
    achievements: [
      "상태 관리 라이브러리(Pinia)와 LocalStorage를 연동하여 비로그인 사용자의 장바구니 데이터를 로그인 후에도 유실 없이 병합하는 로직 설계",
      "CSS 변수와 Tailwind 구성을 활용해 소스 코드 수정 없이 여름/겨울 테마를 즉시 전환할 수 있는 테마 스위칭 시스템 구축",
      "Nuxt.js의 Server Side Rendering을 활용하여 농산물 키워드 검색 엔진 최적화(SEO) 및 초기 로딩 속도 개선",
      "반복되는 API 호출 최적화를 위해 공통 Fetch 모듈을 설계하고 인터셉터를 통한 전역 에러 핸들링 구현"
    ],
    codeSnippet: `// 시즌별 테마 변수를 CSS Variable로 제어
const toggleSeason = (season: 'summer' | 'winter') => {
  const theme = season === 'summer' ? summerConfig : winterConfig;
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(\`--theme-\${key}\`, value);
  });
};`
  },
  {
    id: "os",
    type: "Personal",
    title: "TaeYeon OS (포트폴리오)",
    period: "2026.03",
    role: "기획, 디자인, 프론트엔드 개발 (1인)",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imgCode: "02",
    imageCount: 3,
    links: [
      { label: "GitHub", url: "https://github.com/tyeon99/portfolio", icon: <Github size={14} /> }
    ],
    summary: "macOS 인터페이스를 웹으로 구현한 인터랙티브 포트폴리오입니다. 실제 OS와 유사한 사용자 경험과 안정적인 하이드레이션 처리에 중점을 두었습니다.",
    achievements: [
      "Next.js App Router 환경에서 클라이언트 컴포넌트 마운트 시점을 제어하는 'isMounted' 패턴으로 SSR/CSR 간 하이드레이션 불일치 에러 해결",
      "브라우저 캐시를 활용한 이미지 프리로딩(Image Preloading) 기법으로 윈도우 전환 시 발생하는 레이아웃 시프트와 검은 화면 현상 방지",
      "Framer Motion을 활용해 실제 OS와 흡사한 창 최소화/최대화 애니메이션 및 드래그 앤 드롭 시스템 구현",
      "GitHub Actions를 활용한 CI/CD 파이프라인 구축으로 자동 빌드 및 정적 배포(Export) 프로세스 최적화"
    ],
    codeSnippet: `// SSR 환경에서 안정적인 클라이언트 렌더링을 위한 가드
const [isMounted, setIsMounted] = useState(false);
useEffect(() => setIsMounted(true), []);
if (!isMounted) return null;`
  },
  {
    id: "kiwoom",
    type: "Work",
    title: "키우Me (AI 주식 콘텐츠 챗봇)",
    period: "2024.10 ~ 2025.12",
    role: "프론트엔드 시스템 구축 및 최적화",
    tech: ["Vue.js", "JavaScript", "Tailwind CSS", "LLM API", "Webpack"],
    imgCode: "03",
    imageCount: 3,
    summary: "키움증권 앱 내 AI 주식 챗봇 서비스입니다. 대량의 실시간 AI 응답 데이터를 시각화하고 하이브리드 앱 웹뷰 환경에서의 렌더링 성능을 최적화했습니다.",
    achievements: [
      "텍스트, 차트, 리스트 등 다양한 AI 응답 유형에 대응하는 '동적 컴포넌트 모듈' 설계로 신규 콘텐츠 개발 리드타임 30% 단축",
      "스켈레톤 UI를 도입하여 데이터 바인딩 시 발생하는 CLS(레이아웃 시프트) 현상을 해결하고 체감 로딩 속도 개선",
      "iOS/Android 웹뷰 환경에서 발생하는 Safe Area 이슈 및 기기별 레이아웃 깨짐 현상을 해결하여 크로스 브라우징 안정성 확보",
      "디자인 시스템 가이드를 기반으로 Figma를 활용한 기술적 역제안을 통해 퍼블리싱 생산성 및 UI 일관성 향상"
    ],
    codeSnippet: `// AI 응답 데이터 타입에 따른 동적 컴포넌트 렌더링
<template>
  <div class="chat-response">
    <component 
      :is="responseMap[item.type]" 
      :content="item.data" 
    />
  </div>
</template>`
  },
  {
    id: "hama",
    type: "Work",
    title: "하마터면 (보이스피싱 가상체험)",
    period: "2025.04 ~ 현재",
    role: "UI 개발 및 인터랙션 고도화",
    tech: ["Vue.js", "Nuxt.js", "JavaScript", "Tailwind CSS", "STT API"],
    imgCode: "04",
    imageCount: 3,
    links: [
      { label: "URL", url: "https://wsfarm.co.kr", icon: <Globe size={14} /> }
    ],
    summary: "금융 취약계층을 위한 보이스피싱 예방 교육용 가상체험 서비스입니다. 실제 메신저 환경과 흡사한 채팅 UI를 구현하는 데 주력했습니다.",
    achievements: [
      "실시간 타이핑 애니메이션 및 메시지 딜레이 제어 로직을 통해 실제 상대방과 대화하는 듯한 체험 몰입도 향상",
      "시나리오 흐름과 UI 렌더링 로직을 분리한 '데이터 기반 아키텍처' 설계로 콘텐츠 유지보수 생산성 40% 향상",
      "음성 인식(STT) API 연동으로 타이핑이 익숙하지 않은 고령층 사용자를 위한 접근성 강화 및 사용자 이탈률 감소",
      "체험 종료 후 사용자 대응 패턴 분석 결과를 시각화된 리포트 화면으로 구성하여 정보 전달력 개선"
    ],
    codeSnippet: `// 실제 메신저 느낌의 타이핑 인터랙션 로직
const startTyping = (text) => {
  let i = 0;
  const timer = setInterval(() => {
    msg.value += text[i++];
    if (i === text.length) clearInterval(timer);
  }, 100);
};`
  },
  {
    id: "master",
    type: "Work",
    title: "마스터클래스 주식 교육 플랫폼",
    period: "2025.03 ~ 2025.04",
    role: "프론트엔드 환경 세팅 및 핵심 UI 구축",
    tech: ["Vue.js", "Tailwind CSS", "Axios", "Vue Router"],
    imgCode: "05",
    imageCount: 3,
    links: [
      { label: "URL", url: "https://masterclass.thinkpool.com/", icon: <Globe size={14} /> }
    ],
    summary: "대규모 학습 데이터를 시각화하는 교육 플랫폼입니다. 2개월의 짧은 기간 내에 안정적인 시스템 환경 세팅과 권한 제어 로직을 구현했습니다.",
    achievements: [
      "Tailwind CSS의 유틸리티 우선 방식을 도입하여 코드 가독성을 높이고, 8주라는 촉박한 일정 내에 전체 반응형 UI 개발 완료",
      "Vue Router의 Navigation Guard를 활용하여 사용자 등급별(일반/관리자) 라우팅 접근 권한을 프론트엔드 단에서 안전하게 제어",
      "Axios 인터셉터를 활용한 공통 통신 모듈 및 전역 에러 핸들링 시스템을 구축하여 API 통신 안정성 확보",
      "PC, 태블릿 등 다양한 기기 환경에 대응하는 유연한 반응형 레이아웃 설계로 학습자 접근성 향상"
    ],
    codeSnippet: `// 라우터 가드를 활용한 사용자 등급별 보안 로직
router.beforeEach((to, from, next) => {
  const role = authStore.userRole;
  if (to.meta.requiresAdmin && role !== 'ADMIN') {
    return next({ name: 'Forbidden' });
  }
  next();
});`
  },
  {
    id: "thinkpool",
    type: "Work",
    title: "씽크풀 브랜드 사이트 개편",
    period: "2024.05 ~ 2024.09",
    role: "웹/모바일 프론트엔드 개발 및 SEO",
    tech: ["Vue.js", "JavaScript", "jQuery", "SEO", "Tailwind CSS"],
    imgCode: "06",
    imageCount: 3,
    links: [
      { label: "URL", url: "https://info.thinkpool.com/", icon: <Globe size={14} /> }
    ],
    summary: "씽크풀 공식 브랜드 사이트 개편 프로젝트입니다. 기존 레거시 코드 리팩토링과 검색 엔진 최적화(SEO)에 중점을 두었습니다.",
    achievements: [
      "시맨틱 마크업 기반의 구조 재설계를 통해 Lighthouse SEO 점수 95점 달성 및 주요 포털 검색 유입량 45% 증대",
      "기존 jQuery 레거시 스크립트를 Vue.js 컴포넌트 기반으로 리팩토링하여 코드 충돌 방지 및 런타임 에러율 약 25% 감소",
      "사내 운영팀을 위한 콘텐츠 관리 시스템(CMS) 인터페이스를 구축하여 단순 수정 요청에 소요되는 개발 리소스를 크게 절감",
      "이미지 에셋 최적화 및 불필요한 스크립트 정리를 통해 초기 렌더링 속도 단축 및 사용자 이탈 방지"
    ],
    codeSnippet: `<article class="company-vision">
  <header><h1 class="title">기업 가치 및 비전</h1></header>
  <section class="content"><p>씽크풀은 금융 AI 기술을 선도합니다.</p></section>
</article>`
  },
  {
    id: "maintenance",
    type: "Work",
    title: "주요 금융 서비스 운영 및 유지보수",
    period: "2022.01 ~ 현재",
    role: "UI/UX 고도화 및 퍼블리싱 총괄",
    tech: ["HTML5", "SCSS", "Tailwind CSS", "JavaScript"],
    imgCode: "07",
    imageCount: 4,
    summary: "씽크풀, 키움증권 등 10여 개 이상의 금융 서비스 UI/UX를 전담 관리하며 스타일 시스템 표준화와 운영 안정화에 기여하고 있습니다.",
    achievements: [
      "SCSS 기반의 반응형 믹스인(Mixin) 라이브러리를 자체 구축하여 스타일 코드 작성 및 신규 페이지 제작 효율 50% 향상",
      "Vanilla JS 기반의 재사용 가능한 공통 모달 및 슬라이더 라이브러리를 구현하여 프레임워크에 의존하지 않는 독립적 UI 환경 마련",
      "웹 표준 및 웹 접근성 가이드를 반영하여 전사 서비스의 크로스 브라우징 및 디바이스 최적화 상시 수행",
      "규칙 없이 흩어져 있던 기존 서비스들의 UI 요소를 일관된 스타일 시스템으로 통합하여 전사 UI 일관성 확보"
    ],
    codeSnippet: `// SCSS 믹스인 라이브러리 예시
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card { @include flex-center; }`
  }
];

export default function ProjectsWindow() {
  const [activeId, setActiveId] = useState(PROJECT_DATA[0].id);
  const activeProject = PROJECT_DATA.find((p) => p.id === activeId) || PROJECT_DATA[0];
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const personalProjects = PROJECT_DATA.filter(p => p.type === "Personal");
  const workProjects = PROJECT_DATA.filter(p => p.type === "Work");

  useEffect(() => {
    setLoadedImages({});
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  }, [activeId]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const renderProjectItem = (project: typeof PROJECT_DATA[0]) => (
    <button
      key={project.id}
      onClick={() => setActiveId(project.id)}
      className={`${styles.projectItem} ${activeId === project.id ? styles.activeItem : ""}`}
    >
      {project.type === "Work" ? (
        <Briefcase size={16} className="text-blue-400" />
      ) : (
        <FolderGit2 size={16} className="text-purple-400" />
      )}
      <div className="text-left overflow-hidden">
        <p className={styles.itemTitle}>{project.title}</p>
        <p className={styles.itemType}>{project.type}</p>
      </div>
    </button>
  );

  return (
    <div className={styles.container}>
      {/* 왼쪽 사이드바 */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Projects</h2>
        
        <div className={styles.projectList}>
          <div className="mb-6">
            <h3 className={styles.sidebarSectionLabel}>Side Projects</h3>
            <div className="flex flex-col gap-1">
              {personalProjects.map(renderProjectItem)}
            </div>
          </div>

          {/* --- Work Section --- */}
          <div>
            <h3 className={styles.sidebarSectionLabel}>Work Experience</h3>
            <div className="flex flex-col gap-1">
              {workProjects.map(renderProjectItem)}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상세 내용 */}
      <div ref={contentAreaRef} className={styles.contentArea}>
        {/* 이미지 갤러리 (Swiper 자동 경로 생성) */}
        <div className={styles.imageGallery}>
          <Swiper
            key={activeProject.id} 
            modules={[Navigation, Autoplay]}
            // spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className={styles.mySwiper}
          >
            {/* 💡 imageCount 숫자를 보고 반복문 돌리기 */}
            {Array.from({ length: activeProject.imageCount || 0 }).map((_, idx) => {
              const imgPath = `/portfolio/img/project${activeProject.imgCode}-${idx + 1}.png`;

              const isLoaded = loadedImages[idx];

              return (
                <SwiperSlide key={idx}>
                  <div className={styles.imageWrapper}>
                    {/* 로딩 중일 때 스피너 표시 */}
                    {!isLoaded && (
                      <div className={styles.loaderContainer}>
                        <Loader2 className="animate-spin text-white/20" size={32} />
                      </div>
                    )}
                    
                    <img 
                      src={imgPath} 
                      alt={`${activeProject.title} ${idx + 1}`} 
                      className={`${styles.realImage} ${isLoaded ? styles.loaded : styles.hidden}`} 
                      onLoad={() => handleImageLoad(idx)}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
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