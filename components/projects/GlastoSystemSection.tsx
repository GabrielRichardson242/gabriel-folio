"use client";

import React from "react";
import SiteBanner from "@/components/SiteBanner";

export default function GlastoSystemSection() {
  return (
    <section className="w-full overflow-x-hidden selection:bg-[#cc1b2d] selection:text-[#ededed] bg-[#232323]">
      <SiteBanner />

      {/* SECTION 1: HERO & BANNERS */}
      <div className="w-full flex flex-col items-start bg-[#232323]">
        <div className="w-full relative h-[68vh] md:h-[68vh] overflow-hidden border-b border-[#ededed]">
          <img 
            src="/projects/glasto-hero.jpg" 
            srcSet="/projects/glasto-hero@2x.jpg 2x"
            alt="Glastonbury Festival Game Prototype Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="w-full h-10 bg-[#1a1a1a] border-b border-[#ededed] flex items-center justify-start font-disket text-[#deedd5] uppercase text-[10px] md:text-xs px-[30px]">
          Glastonbury festival video game prototype campaign
        </div>

        <div className="w-full py-2 bg-[#1a1a1a] border-b border-[#ededed] flex items-center justify-start font-disket text-[#deedd5] uppercase text-[9px] md:text-[11px] px-[30px]">
          <div className="flex flex-row items-center gap-[20px]">
            <span>Role: Concept Lead, Led the 3 person build team</span>
            <span>Tools: Blender, Unity(3D), Creative Coding, Visual Design</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROBLEM STATEMENT & CHALLENGE */}
      <div className="w-full bg-[#232323] pt-16 pb-32 px-[30px] flex flex-col items-start">
        <div className="w-full flex flex-col gap-12 md:gap-16">
          <h1 className="font-grith text-[#deedd5] uppercase text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.8] [font-synthesis:none] max-w-[90%]">
            Reframing a marketing brief/ <br />
            into a system problem...
          </h1>
          <div className="w-full h-[1px] bg-[#ededed] opacity-30"></div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 font-grith text-[#cc1b2d] uppercase text-[clamp(1.5rem,3.5vw,3rem)] leading-[0.9] [font-synthesis:none]">
            <h2 className="whitespace-nowrap pt-2">The challenge:</h2>
            <h2 className="text-left w-full max-w-4xl">
              How do you increase engagement at a festival without relying on a headline act
            </h2>
          </div>
        </div>
      </div>

      {/* SECTION 3: METHOD / WE STARTED HERE */}
      <div className="w-full bg-[#cc1b2d] py-32 md:py-48 px-[30px] flex flex-col items-start">
        <div className="w-full flex flex-col gap-12">
          <div className="font-britrln text-[#ededed] flex flex-col gap-2 uppercase tracking-tight">
            <p className="m-0 text-[clamp(1.5rem,3vw,3rem)] opacity-80">We started here:</p>
            <p className="m-0 font-bold leading-[0.95] text-[clamp(2.5rem,5.5vw,5.5rem)] max-w-6xl">
              What are the problems that young people have at festivals that we can fix?
            </p>
          </div>
          <div className="relative w-full max-w-6xl aspect-[16/9] mt-16 mb-8">
            <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 w-[calc(100%+2rem)] h-[calc(100%+2rem)] md:w-[calc(100%+4rem)] md:h-[calc(100%+4rem)] bg-[#b31525] z-0"></div>
            <div className="absolute inset-0 bg-[#ededed] border-2 border-[#1a1a1a] overflow-hidden z-10">
              <img src="/projects/mooving-mock.png" alt="Mooving Prototype" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: STRIPES */}
      <div className="w-full flex flex-col">
        {[
          { title: "Memorialise the experience", desc: "I designed a system that turns real-world exploration into digital memory.", bg: "bg-[#b31525]" },
          { title: "Aid Exploration", desc: "Through the integrated map and AR navigation and gameification, exploration is incentivised, making it safe and simple.", bg: "bg-[#cc1b2d]" },
          { title: "Take it home with you", desc: "The system extends beyond the festival, keeping the experience active with the goal of increasing retention year on year.", bg: "bg-[#b31525]" }
        ].map((stripe, i) => (
          <div key={i} className={`w-full ${stripe.bg} py-28 md:py-40 px-[30px] flex justify-start border-t border-[#cc1b2d]/20`}>
            <div className="w-full flex flex-col gap-[10px]">
              <h3 className="font-grith text-[#ededed] uppercase text-[clamp(3rem,5.2vw,5.2rem)] leading-none">{stripe.title}</h3>
              <p className="font-britrln text-[#ededed] text-xl md:text-[28px] max-w-4xl leading-snug opacity-90">{stripe.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 5: BUILD PLAN */}
      <div className="w-full bg-[#232323] py-24 md:py-40 px-[30px] flex justify-start border-t border-[#3a3a3a]">
        <div className="w-full flex flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-6 md:gap-10">
            <h2 className="font-grith text-[#ededed] uppercase text-[clamp(2.5rem,5vw,5rem)] leading-none">Build Plan</h2>
            <p className="font-britrln text-[#ededed] text-lg md:text-2xl max-w-4xl leading-snug">I reframed the brief into a two layer system, separating user experience from system logic.</p>
          </div>
          <img src="/projects/build-plan.svg" alt="System diagram" className="w-full max-w-6xl h-auto" />
        </div>
      </div>

      {/* SECTION 6: 3D WORLD */}
      <div className="w-full bg-[#cc1b2d] py-32 px-[30px] flex flex-col items-center gap-24">
        <h2 className="w-full font-grith uppercase text-[12vw] leading-[0.8] text-center text-[#b31525]" style={{ WebkitTextStroke: "3px #ededed" }}>
          3d world <br /> core interaction
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Cow model", "Animal Crossing Assets", "Unity, low fidelity to high"].map((text, i) => (
            <div key={i} className="w-full bg-[#b31525] aspect-[3/4] flex items-center justify-center p-8 shadow-2xl border border-white/5">
              <span className="font-grith text-[#ededed] uppercase text-4xl xl:text-5xl text-center leading-tight">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: UNITY VIDEO */}
      <div className="w-full bg-[#232323] flex justify-center py-24 md:py-32 px-[30px]">
        <div className="w-full aspect-video bg-[#1a1a1a] border border-[#ededed] relative overflow-hidden shadow-2xl">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/projects/glasto-unity-prototype.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-[#ededed]/20 rounded-sm">
            <span className="font-disket text-[#deedd5] uppercase text-[10px] tracking-[0.2em]">Execution: Unity Engine v6.0 // Real-time Simulation</span>
          </div>
        </div>
      </div>

      {/* SECTION 8: OUTCOME */}
      <div className="w-full bg-[#232323] min-h-[80vh] py-24 md:py-40 px-[30px] flex flex-col justify-center border-t border-[#3a3a3a]">
        <div className="w-full mx-auto flex flex-col gap-16 md:gap-24">
          <h2 className="font-grith text-[#deedd5] uppercase text-[clamp(4rem,10vw,10rem)] leading-[0.8]">Outcome.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-6">
              <p className="font-britrln text-[#ededed] text-lg md:text-2xl leading-snug">[Placeholder text: Final thoughts summarizes the end of the prototype phase.]</p>
              <div className="w-full max-w-md h-[1px] bg-[#ededed] mt-4 opacity-50"></div>
            </div>
            <div className="w-full aspect-video bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
              <span className="font-disket text-[#555] uppercase tracking-widest text-sm text-center px-4">[Outcome Visual Placeholder]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}