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

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ProjectLink {
  label: string;
  url: string;
  icon: React.ReactNode;
}

interface BaseProject {
  id: string;
  type: "Personal" | "Work";
  title: string;
  period: string;
  role: string;
  tech: string[];
  imgCode: string;
  imageCount: number;
  links?: ProjectLink[];
  summary: string;
  achievements: string[];
}

interface StandardProject extends BaseProject {
  codeSnippet: string;
}

interface MultiSnippetProject extends BaseProject {
  codeSnippets: {
    vue: string;
    react: string;
  };
}

type Project = StandardProject | MultiSnippetProject;

const PROJECT_DATA: Project[] = [
  {
    id: "wolsang",
    type: "Personal",
    title: "월상농원 (D2C 커머스 & 어드민)",
    period: "2026.01 ~ 현재",
    role: "기획, 디자인, 프론트엔드 개발 (1인)",
    tech: ["Vue 3", "Nuxt.js", "React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Pinia", "Zustand"],
    imgCode: "01",
    imageCount: 5,
    links: [
      { label: "URL", url: "https://wsfarm.co.kr", icon: <Globe size={14} /> },
      { label: "GitHub", url: "https://github.com/tyeon99/ws_store", icon: <Github size={14} /> }
    ],
    summary: "부모님 농장의 과일 직거래를 위해 구축한 플랫폼으로, Vue 3 기반의 초기 구축부터 Next.js로의 기술 확장까지 직접 수행하며 각 프레임워크에 최적화된 아키텍처를 설계했습니다. 특히 쇼핑의 흐름이 끊기지 않도록 '로그인 전후의 상태 동기화'와 '안정적인 세션 관리'를 구현하는 데 가장 큰 공을 들였습니다.",
    achievements: [
      "사용자 중심의 하이브리드 장바구니 시스템 설계: 비로그인 상태의 로컬 데이터와 로그인 후의 서버 DB 데이터를 유실 없이 합쳐주는 '데이터 병합(Merge) 로직'을 직접 구현하여 구매 전환율 고려",
      "유연한 브랜드 테마 시스템 구축: CSS 변수와 상태 관리 도구를 연동해 소스 코드 수정 없이도 시즌별(여름/겨울) 사이트 전체 분위기를 즉시 전환할 수 있는 동적 테마 환경 마련",
      "API 응답 데이터의 계층 분리 및 타입 안정성 확보: 백엔드 API 객체를 프론트엔드에서 사용하기 좋은 모델로 가공하는 매핑 레이어를 두어, 데이터 구조 변경에도 안전하게 대응할 수 있는 TypeScript 기반 코드 베이스 구축",
      "전역 상태 관리 및 세션 보안 최적화: Zustand/Pinia의 영속성(Persist) 미들웨어와 쿠키 시스템을 결합해 새로고침이나 브라우저 종료 후에도 안정적으로 유지되는 사용자 인증 플로우 완성",
      "실무 중심의 예외 처리 및 보안 로직 적용: API 요청 헤더의 토큰 클리닝 처리와 401 에러(Unauthorized)에 대한 전역 예외 처리 자동화를 통해 서비스 운영 안정성 확보"
    ],
    codeSnippets: {
      vue: `// [Vue 3 / Pinia] 비로그인(Guest) 장바구니 데이터를 서버로 병합
const mergeLocalCart = async () => {
  if (cartItems.value.length === 0) return await fetchCartList();

  const itemsToSync = cartItems.value.map(item => ({
    productId: item.id,
    quantity: item.quantity
  }));

  try {
    await useMainFetch('/api/user/cart/add', {
      method: 'POST',
      body: { items: itemsToSync }
    });
    cartItems.value = [];
    await fetchCartList();
  } catch (error) {
    console.error('장바구니 동기화 실패:', error);
    await fetchCartList();
  }
};`,
      react: `// [React / Zustand] 하이브리드 환경의 장바구니 병합 엔진
mergeLocalCart: async () => {
  const localItems = get().cartItems;
  const { userToken } = useMainAuthStore.getState();

  if (userToken && localItems.length > 0) {
    const headers = get().getHeaders();
    const apiItems = localItems.map(item => ({ 
      productId: item.id, 
      quantity: item.quantity 
    }));

    try {
      const response = await fetch('/api/user/cart/add', {
        method: 'POST',
        headers,
        body: JSON.stringify({ items: apiItems })
      }).then(res => res.json());

      if (response.status === 200) {
        set({ cartItems: [] });
        await get().fetchCartList();
      }
    } catch (e) {
      console.error('장바구니 병합 프로세스 오류:', e);
    }
  }
}`
    }
  },
  {
    id: "os",
    type: "Personal",
    title: "TaeYeon OS (포트폴리오)",
    period: "2026.03",
    role: "기획, 디자인, 프론트엔드 개발 (1인)",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Swiper"],
    imgCode: "02",
    imageCount: 3,
    links: [ { label: "GitHub", url: "https://github.com/tyeon99/portfolio", icon: <Github size={14} /> } ],
    summary: "macOS 인터페이스를 웹으로 구현한 인터랙티브 포트폴리오입니다. 데스크톱 중심의 macOS 경험뿐만 아니라 스마트폰 환경에 최적화된 모바일 전용 반응형 UX/UI까지 정교하게 설계했습니다.",
    achievements: [
      "디바이스 환경별 반응형 레이아웃 분리 구현: 데스크톱 뷰에서는 macOS 상단바 및 Dock 인터페이스를 유지하고, 모바일 뷰 진입 시 iOS 스타일 상태바, 터치 스와이프 제스처 및 전체화면 모달로 유연하게 전환되도록 최적화",
      "Next.js App Router 환경에서 클라이언트 컴포넌트 마운트 시점을 제어하는 'isMounted' 패턴으로 하이드레이션 불일치 에러 해결",
      "시스템 부팅 시점에 주요 에셋을 Image 객체로 선제적 프리로딩하여 앱 실행 시 화이트 플래시 현상 해결",
      "GitHub Actions를 활용한 CI/CD 파이프라인 구축으로 자동 빌드 및 정적 배포 프로세스 최적화"
    ],
    codeSnippet: `// [핵심 로직] 하이드레이션 에러 방지 및 리소스 선제적 프리로딩
useEffect(() => {
  setIsMounted(true);
  WALLPAPERS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  const timer = setInterval(() => setCurrentTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);`
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
    summary: "키움증권 앱 내 AI 주식 챗봇 서비스입니다. 하이브리드 앱 웹뷰 환경에서의 렌더링 성능과 동적 데이터 시각화를 최적화했습니다.",
    achievements: [
      "AI 응답 유형에 대응하는 '동적 컴포넌트 모듈' 설계로 신규 콘텐츠 개발 리드타임 30% 단축",
      "스켈레톤 UI 도입으로 CLS 현상을 해결하고 비동기 데이터 바인딩 시 체감 로딩 속도 개선",
      "Native 브릿지 통신을 통한 Safe Area 대응 및 기기별 레이아웃 최적화로 크로스 브라우징 안정성 확보"
    ],
    codeSnippet: `// [핵심 로직] 비동기 컴포넌트 팩토리를 활용한 메시지 디스패처
import { defineAsyncComponent } from 'vue';

const COMPONENT_MAP = {
  TEXT:   defineAsyncComponent(() => import('./types/Text.vue')),
  CHART:  defineAsyncComponent(() => import('./types/StockChart.vue')),
};

export default {
  props: ['message'],
  setup(props) {
    const resolveComponent = (type) => COMPONENT_MAP[type] || COMPONENT_MAP.TEXT;
    return { resolveComponent };
  }
}`
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
    links: [ { label: "URL", url: "https://wsfarm.co.kr", icon: <Globe size={14} /> } ],
    summary: "금융 취약계층을 위한 보이스피싱 예방 교육 서비스입니다. 실제 메신저 환경의 디테일한 인터랙션을 구현하는 데 주력했습니다.",
    achievements: [
      "실시간 타이핑 애니메이션 및 메시지 딜레이 제어를 통해 실제 대화 같은 체험 몰입도 향상",
      "시나리오 흐름과 UI 렌더링을 분리한 '데이터 기반 아키텍처' 설계로 유지보수 생산성 40% 향상",
      "음성 인식(STT) API 연동으로 고령층 사용자를 위한 대화형 인터페이스 접근성 강화"
    ],
    codeSnippet: `// [핵심 로직] HTML 태그 노출 방지 재귀적 타이핑 엔진
async typeNextMessage(index) {
  if (index >= this.aiMessages.length) return;
  const message = this.aiMessages[index];
  const regex = /<\/?[^>]+>|[^<>]+/g;
  const parts = message.fullText.match(regex) || [];
  let partIdx = 0, charIdx = 0;

  await new Promise((resolve) => {
    this.typingInterval = setInterval(() => {
      if (partIdx < parts.length) {
        const part = parts[partIdx];
        if (part.startsWith('<')) { message.typingText += part; partIdx++; }
        else if (charIdx < part.length) { message.typingText += part[charIdx++]; }
        else { partIdx++; charIdx = 0; }
      } else { clearInterval(this.typingInterval); resolve(); }
    }, 105);
  });
}`
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
    links: [ { label: "URL", url: "https://masterclass.thinkpool.com/", icon: <Globe size={14} /> } ],
    summary: "대규모 학습 데이터 시각화 교육 플랫폼입니다. 짧은 기간 내에 권한 제어 로직과 안정적인 시스템 환경을 구축했습니다.",
    achievements: [
      "Vue Router Navigation Guard를 활용한 사용자 등급별 라우팅 보안 및 접근 권한 제어",
      "Axios 인터셉터 기반의 공통 통신 모듈 및 전역 에러 핸들링 시스템 구축",
      "유연한 반응형 레이아웃 설계로 다양한 디바이스(PC, 태블릿) 학습 환경 대응"
    ],
    codeSnippet: `// [핵심 로직] Route Meta를 활용한 권한 제어 시스템
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, userRole } = useAuthStore();
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' });
  }
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    alert('접근 권한이 없습니다.');
    return next({ name: 'Home' });
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
    links: [ { label: "URL", url: "https://info.thinkpool.com/", icon: <Globe size={14} /> } ],
    summary: "공식 브랜드 사이트 개편 프로젝트입니다. 레거시 코드 리팩토링과 검색 엔진 최적화(SEO)에 집중했습니다.",
    achievements: [
      "시맨틱 마크업 기반 재설계로 Lighthouse SEO 점수 95점 달성 및 검색 유입량 증대",
      "jQuery 레거시 스크립트를 Vue 컴포넌트로 리팩토링하여 런타임 에러율 약 25% 감소",
      "이미지 에셋 및 스크립트 최적화를 통한 초기 렌더링 성능 개선"
    ],
    codeSnippet: `// [핵심 로직] SEO 최적화를 위한 JSON-LD 주입
export default {
  mounted() {
    const schema = { "@context": "https://schema.org", "@type": "Organization", "name": "씽크풀" };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}`
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
    summary: "키움증권 등 다수의 금융 서비스 UI/UX를 전담 관리하며 스타일 시스템 표준화와 운영 안정화에 기여하고 있습니다.",
    achievements: [
      "SCSS 기반 반응형 믹스인 라이브러리 자체 구축으로 스타일 작성 효율 50% 향상",
      "Vanilla JS 기반 재사용 모달/슬라이더 라이브러리 구현으로 프레임워크 독립적 환경 마련",
      "웹 표준 및 접근성 가이드를 반영한 크로스 브라우징 및 디바이스 최적화 상시 수행"
    ],
    codeSnippet: `// [핵심 로직] 반응형 Mixin 시스템
$breakpoints: ('mobile': 480px, 'tablet': 768px, 'desktop': 1024px);
@mixin respond-to($device) {
  @media screen and (max-width: map-get($breakpoints, $device)) { @content; }
}`
  }
];

export default function ProjectsWindow() {
  const [activeId, setActiveId] = useState<string>(PROJECT_DATA[0].id);
  const [activeCodeTab, setActiveCodeTab] = useState<"vue" | "react">("react");
  
  const activeProject = PROJECT_DATA.find((p) => p.id === activeId) || PROJECT_DATA[0];
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const personalProjects = PROJECT_DATA.filter(p => p.type === "Personal");
  const workProjects = PROJECT_DATA.filter(p => p.type === "Work");

  useEffect(() => {
    setLoadedImages({});
    setActiveCodeTab("vue");
    if (contentAreaRef.current) contentAreaRef.current.scrollTop = 0;
  }, [activeId]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const renderProjectItem = (project: Project) => (
    <button
      key={project.id}
      onClick={() => setActiveId(project.id)}
      className={`${styles.projectItem} ${activeId === project.id ? styles.activeItem : ""}`}
    >
      {project.type === "Work" ? (
        <Briefcase size={16} className="text-blue-400 shrink-0" />
      ) : (
        <FolderGit2 size={16} className="text-purple-400 shrink-0" />
      )}
      <div className="text-left overflow-hidden">
        <p className={styles.itemTitle}>{project.title}</p>
        <p className={styles.itemType}>{project.type}</p>
      </div>
    </button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Projects</h2>
        <div className={styles.projectList}>
          <div className="mb-6">
            <h3 className={styles.sidebarSectionLabel}>Side Projects</h3>
            <div className={styles.sidebarGroup}>{personalProjects.map(renderProjectItem)}</div>
          </div>
          <div>
            <h3 className={styles.sidebarSectionLabel}>Work Experience</h3>
            <div className={styles.sidebarGroup}>{workProjects.map(renderProjectItem)}</div>
          </div>
        </div>
      </div>

      <div ref={contentAreaRef} className={styles.contentArea}>
        <div className={styles.imageGallery}>
          <Swiper
            key={activeProject.id} 
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className={styles.mySwiper}
          >
            {Array.from({ length: activeProject.imageCount }).map((_, idx) => {
              const imgPath = `/portfolio/img/project${activeProject.imgCode}-${idx + 1}.png`;
              const isLoaded = loadedImages[idx];
              return (
                <SwiperSlide key={idx}>
                  <div className={styles.imageWrapper}>
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
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                  {link.icon} <span>{link.label}</span>
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
            <Code2 size={16} className="text-gray-300 shrink-0" />
            {activeProject.tech.map((t, i) => (
              <span key={i} className={styles.techTag}>{t}</span>
            ))}
          </div>

          <div className={styles.codeSection}>
            <div className={styles.sectionHeader}>
              <Terminal size={18} className="text-blue-400" />
              <h3 className={styles.sectionSubtitle}>Logic Insight</h3>
              
              {"codeSnippets" in activeProject && (
                <div className={styles.codeTabGroup}>
                  <button 
                    onClick={() => setActiveCodeTab("vue")}
                    className={`${styles.codeTabButton} ${activeCodeTab === 'vue' ? styles.tabVueActive : ""}`}
                  >Vue</button>
                  <button 
                    onClick={() => setActiveCodeTab("react")}
                    className={`${styles.codeTabButton} ${activeCodeTab === 'react' ? styles.tabReactActive : ""}`}
                  >React</button>
                </div>
              )}
            </div>

            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                  <span className={styles.dot} style={{ background: "#ff5f56" }} />
                  <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.dot} style={{ background: "#27c93f" }} />
                </div>
                <span className={styles.terminalTitle}>
                  {"codeSnippets" in activeProject 
                    ? `cart-logic.${activeCodeTab === 'vue' ? 'js' : 'ts'}` 
                    : 'core-logic.ts'}
                </span>
              </div>
              <pre className={styles.codeContent}>
                <code>
                  {"codeSnippets" in activeProject 
                    ? activeProject.codeSnippets[activeCodeTab] 
                    : activeProject.codeSnippet}
                </code>
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