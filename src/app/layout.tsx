import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/common.css";

// 폰트 설정 (영문/숫자는 맥OS 느낌 나게 Geist 폰트 그대로 쓰는 거 추천해!)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⭐ 여기가 핵심! 브라우저 탭 이름이랑 검색 엔진(SEO)에 잡힐 정보야.
export const metadata: Metadata = {
  title: "TaeYeon Frontend Portfolio",
  description: "프론트엔드 개발자 김태연의 포트폴리오입니다.",
  // 나중에 여기에 파비콘(아이콘)이나 오픈그래프(카톡 공유 썸네일) 이미지도 추가할 수 있어.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 💡 한국어 사이트니까 구글 번역기 안 뜨게 'ko'로 확실히 박아두자.
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 모든 페이지(창)들이 이 children 안에서 렌더링 될 거야 */}
        {children}
      </body>
    </html>
  );
}