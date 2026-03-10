"use client";

import React from "react"; // 💡 React를 import 해줘야 CSSProperties를 쓸 수 있어
import { 
  Atom, Code2, Cpu, Database, 
  Sparkles, Zap, Globe, Terminal 
} from "lucide-react";
import styles from "@/assets/css/intro.module.css";

export default function DesktopIntro() {
  const particles = [
    { icon: <Atom />, size: 80, top: "10%", left: "10%", x: "50px", y: "30px", d: "10s" },
    { icon: <Code2 />, size: 50, top: "20%", left: "80%", x: "-40px", y: "60px", d: "15s" },
    { icon: <Cpu />, size: 100, top: "70%", left: "15%", x: "30px", y: "-50px", d: "12s" },
    { icon: <Database />, size: 60, top: "80%", left: "75%", x: "-60px", y: "-40px", d: "18s" },
    { icon: <Globe />, size: 40, top: "40%", left: "5%", x: "80px", y: "20px", d: "14s" },
    { icon: <Terminal />, size: 70, top: "50%", left: "90%", x: "-30px", y: "70px", d: "11s" },
    { icon: <Sparkles />, size: 30, top: "15%", left: "45%", x: "20px", y: "80px", d: "9s" },
    { icon: <Zap />, size: 120, top: "45%", left: "45%", x: "-10px", y: "-10px", d: "20s" },
  ];

  return (
    <div className={styles.introContainer}>
      {particles.map((p, idx) => (
        <div 
          key={idx} 
          className={styles.particleIcon}
          style={{ 
            top: p.top, 
            left: p.left,
            fontSize: p.size,
            // 👇 any 대신 React.CSSProperties로 타입 캐스팅!
            "--x": p.x, 
            "--y": p.y, 
            "--duration": p.d 
          } as React.CSSProperties}
        >
          {p.icon}
        </div>
      ))}

      <div className="text-center z-10">
        <h1 className={styles.mainTitle}>TaeYeon</h1>
        <p className={styles.description}>Frontend Developer Portfolio</p>
        <div className="mt-8 flex gap-4 justify-center opacity-40 italic text-white text-sm">
          <span>#Creativity</span>
          <span>#Logic</span>
          <span>#Performance</span>
        </div>
      </div>
    </div>
  );
}