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
    summary: "부모님 농장의 과일 직거래를 위해 만든 사이트입니다. 단순히 물건을 파는 것을 넘어, 로그인 전후의 장바구니 데이터를 자연스럽게 합치고 토큰 기반으로 세션을 꼼꼼하게 관리하는 등 사용자가 재접속하거나 로그인할 때 겪을 수 있는 번거로움을 해결하는 데 집중했습니다.",
    achievements: [
    "Pinia와 쿠키를 연동해 새로고침을 해도 로그인이 유지되도록 인증 시스템을 잡았고, 자동 로그인 체크 여부에 따라 쿠키의 유효기간을 7일 또는 세션 종료 시점으로 나눠서 관리",
    "로그인 여부에 따라 장바구니 데이터가 로컬 스토리지와 서버 사이에서 유실되지 않도록 데이터 병합(Merge) 로직을 직접 설계",
    "매번 API를 요청할 때마다 헤더에 토큰을 넣는 번거로움을 줄이려 공통 Fetch 모듈을 만들었으며, 토큰 만료(401 에러) 시 전역 알림을 띄우고 로그아웃시키는 예외 처리를 자동화",
    "소스 코드 수정 없이 CSS 변수값만 갈아 끼우면 사이트 전체 분위기(여름/겨울)를 한 번에 바꿀 수 있는 시즌 테마 시스템을 구축"
  ],
    codeSnippet: `// Pinia Store: 비로그인(Guest) 장바구니 데이터를 로그인(Member) 계정으로 병합
const mergeLocalCart = async () => {
  if (cartItems.value.length === 0) return await fetchCartList();

  // 1. 로컬 저장소의 품목들을 서버 API 포맷(Bulk)으로 가공
  const itemsToSync = cartItems.value.map(item => ({
    productId: item.id,
    quantity: item.quantity
  }));

  try {
    // 2. 서버 API 호출: 이미 있는 상품은 수량을 합산(Upsert)하는 백엔드 로직과 연동
    await useMainFetch('/api/user/cart/add', {
      method: 'POST',
      body: { items: itemsToSync }
    });

    // 3. 동기화 성공 후, 서버의 최종 목록을 다시 불러와 로컬 상태를 덮어씌움 (Single Source of Truth)
    await fetchCartList();
  } catch (error) {
    console.error('장바구니 동기화 실패:', error);
    await fetchCartList(); // 에러 발생 시에도 서버 데이터로 복구 시도
  }
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
      "시스템 부팅 시점에 배경화면 및 주요 에셋을 Image 객체로 선제적 프리로딩(Preloading)하여, 앱 실행 시 발생하는 화이트 플래시 현상을 해결",
      "Framer Motion을 활용해 실제 OS와 흡사한 창 최소화/최대화 애니메이션 및 드래그 앤 드롭 시스템 구현",
      "GitHub Actions를 활용한 CI/CD 파이프라인 구축으로 자동 빌드 및 정적 배포(Export) 프로세스 최적화"
    ],
    codeSnippet: `// [핵심 로직] 하이드레이션 에러 방지 및 시스템 리소스 선제적 프리로딩
useEffect(() => {
  setIsMounted(true); // 1. 클라이언트 마운트 확정 후 렌더링 (SSR 불일치 해결)

  // 2. 배경화면 등 무거운 리소스를 브라우저 캐시에 미리 로드하여 전환 딜레이 제거
  WALLPAPERS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // 3. 시스템 시간 업데이트 및 전역 이벤트 리스너(메뉴 닫기 등) 초기화
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
    summary: "키움증권 앱 내 AI 주식 챗봇 서비스입니다. 대량의 실시간 AI 응답 데이터를 시각화하고 하이브리드 앱 웹뷰 환경에서의 렌더링 성능을 최적화했습니다.",
    achievements: [
      "텍스트, 차트, 리스트 등 다양한 AI 응답 유형에 대응하는 '동적 컴포넌트 모듈' 설계로 신규 콘텐츠 개발 리드타임 30% 단축",
      "스켈레톤 UI를 도입하여 데이터 바인딩 시 발생하는 CLS(레이아웃 시프트) 현상을 해결하고 체감 로딩 속도 개선",
      "iOS/Android 웹뷰 환경에서 발생하는 Safe Area 이슈 및 기기별 레이아웃 깨짐 현상을 해결하여 크로스 브라우징 안정성 확보",
      "디자인 시스템 가이드를 기반으로 Figma를 활용한 기술적 역제안을 통해 퍼블리싱 생산성 및 UI 일관성 향상"
    ],
    codeSnippet: `// [핵심 로직] 비동기 컴포넌트 팩토리를 활용한 확장형 메시지 디스패처
import { defineAsyncComponent } from 'vue';

// 타입별 컴포넌트 매핑 (신규 타입 추가 시 이 객체만 업데이트하면 됨)
const COMPONENT_MAP = {
  TEXT:   defineAsyncComponent(() => import('./types/Text.vue')),
  CHART:  defineAsyncComponent(() => import('./types/StockChart.vue')),
  LIST:   defineAsyncComponent(() => import('./types/PriceList.vue')),
  REPORT: defineAsyncComponent(() => import('./types/AnalysisReport.vue')),
};

export default {
  props: ['message'],
  setup(props) {
    // 템플릿의 조건부 렌더링(v-if)을 제거하고 로직을 추상화하여 유지보수성 향상
    const resolveComponent = (type) => COMPONENT_MAP[type] || COMPONENT_MAP.TEXT;
    return { resolveComponent };
  }
}

// 필요 시점에만 컴포넌트를 로드하여 초기 렌더링 성능 최적화.
<template>
  <div class="chat-response-node">
    <component 
      :is="resolveComponent(message.type)" 
      :payload="message.data"
      @action="$emit('interaction')" 
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
    codeSnippet: `// [핵심 로직] HTML 태그 노출을 방지하는 재귀적 타이핑 인터랙션 엔진
async typeNextMessage(index) {
  if (index >= this.aiMessages.length) return this.completeTyping();

  const message = this.aiMessages[index];
  
  // 💡 정규표현식을 통해 HTML 태그와 일반 텍스트를 분리하여 태그 깨짐 현상 방지
  const regex = /<\/?[^>]+>|[^<>]+/g;
  const parts = message.fullText.match(regex) || [];
  let partIdx = 0, charIdx = 0;

  await new Promise((resolve) => {
    this.typingInterval = setInterval(() => {
      if (partIdx < parts.length) {
        const part = parts[partIdx];
        
        // 태그는 즉시 반영, 일반 텍스트는 한 글자씩 타이핑하여 리얼리티 부여
        if (part.startsWith('<')) {
          message.typingText += part;
          partIdx++;
        } else if (charIdx < part.length) {
          message.typingText += part[charIdx++];
        } else {
          partIdx++; charIdx = 0;
        }
        this.scrollToBottom(); // 실시간 스크롤 추적
      } else {
        clearInterval(this.typingInterval);
        setTimeout(resolve, 1000); // 메시지 간 자연스러운 간격(1초) 부여
      }
    }, 105);
  });

  // 다음 메시지 순차 실행 (Async/Await 재귀 호출)
  await this.typeNextMessage(++index);
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
    codeSnippet: `// [핵심 로직] Route Meta 필드를 활용한 다중 등급 권한 제어 시스템
  
// 1. 라우트 정의 시 등급별 접근 권한 설정 (확장성 고려)
const routes = [
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['ADMIN'] } 
  },
  {
    path: '/lecture/premium',
    component: PremiumLecture,
    meta: { requiresAuth: true, roles: ['ADMIN', 'PAID_USER'] }
  }
];

// 2. 전역 가드를 통한 보안 라우팅 및 비정상 접근 차단
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated, userRole } = authStore;

  // 로그인 필수 페이지인데 토큰이 없는 경우
  if (to.meta.requiresAuth && !isAuthenticated) {
    alert('로그인이 필요한 서비스입니다.');
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  // 특정 역할(Role)이 필요한 페이지인데 권한이 부족한 경우
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    console.warn(\`Unauthorized access: \${userRole} attempted to enter \${to.path}\`);
    alert('해당 콘텐츠에 대한 접근 권한이 없습니다.');
    return next({ name: 'Home' });
  }

  next(); // 모든 검증 통과 시 페이지 진입 허용
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
    codeSnippet: `// [핵심 로직] SEO 최적화를 위한 JSON-LD 구조화 데이터 및 메타데이터 주입 시스템

/* 구글 검색 결과에 기업 정보(이름, 로고, SNS 등)를 리치 결과로 
   노출시키기 위한 JSON-LD 스크립트 설계 */
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "씽크풀(Thinkpool)",
  "url": "https://info.thinkpool.com",
  "description": "금융 AI 기술을 선도하는 알고리즘 플랫폼 기업"
};

// Vue.js 생명주기에 맞춰 페이지별 메타 태그와 스키마 정보를 동적으로 주입
export default {
  mounted() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
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
    summary: "씽크풀, 키움증권 등 10여 개 이상의 금융 서비스 UI/UX를 전담 관리하며 스타일 시스템 표준화와 운영 안정화에 기여하고 있습니다.",
    achievements: [
      "SCSS 기반의 반응형 믹스인(Mixin) 라이브러리를 자체 구축하여 스타일 코드 작성 및 신규 페이지 제작 효율 50% 향상",
      "Vanilla JS 기반의 재사용 가능한 공통 모달 및 슬라이더 라이브러리를 구현하여 프레임워크에 의존하지 않는 독립적 UI 환경 마련",
      "웹 표준 및 웹 접근성 가이드를 반영하여 전사 서비스의 크로스 브라우징 및 디바이스 최적화 상시 수행",
      "규칙 없이 흩어져 있던 기존 서비스들의 UI 요소를 일관된 스타일 시스템으로 통합하여 전사 UI 일관성 확보"
    ],
    codeSnippet: `// [핵심 로직] 전사 서비스 표준화를 위한 반응형 & 접근성 Mixin 시스템

/* 브레이크포인트 관리와 미디어 쿼리를 추상화하여 
   코드 가독성을 높이고 유지보수 포인트를 일원화함 */
$breakpoints: (
  'mobile': 480px,
  'tablet': 768px,
  'desktop': 1024px
);

@mixin respond-to($device) {
  @if map-has-key($breakpoints, $device) {
    @media screen and (max-width: map-get($breakpoints, $device)) {
      @content;
    }
  }
}

/* 금융 서비스의 긴 텍스트 처리를 위한 접근성 고려 말줄임 시스템 */
@mixin ellipsis($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// 적용 예시: 복잡한 카드 레이아웃도 단 몇 줄로 표준화 대응
.product-card {
  @include ellipsis(2); // 두 줄 말줄임 자동 처리
  @include respond-to('mobile') {
    padding: 10px; // 모바일 해상도 즉시 대응
  }
}`
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
            <Code2 size={16} className="text-gray-300" />
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