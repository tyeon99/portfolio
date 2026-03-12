import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",         // 정적 파일 생성을 위한 설정
  basePath: "/portfolio",          // GitHub Pages에서 사용하는 경로 
  assetPrefix: "/portfolio",       // 정적 에셋 로딩을 위한 경로

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
