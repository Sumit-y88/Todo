"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const marqueeItems = [
  "GET THINGS DONE",
  "ORGANIZE YOUR DAY",
  "STAY ON TRACK",
  "LESS CLUTTER",
  "MORE FOCUS",
  "SHIP IT",
  "DEEP WORK",
  "MAKE PROGRESS",
];

function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-8 pr-8 shrink-0"
    >
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-8">
          <span className="whitespace-nowrap font-bold tracking-tight text-bru-ink">
            {item}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-bru-ink"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
      ))}
    </div>
  );
}

const features = [
  {
    index: "01",
    strip: "bg-bru-primary",
    title: "Create & Organize",
    description:
      "Jot down tasks with titles and descriptions. Everything organized in one clean, tactile board.",
    badge: "LIGHTNING FAST",
    badgeBg: "bg-bru-yellow",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    index: "02",
    strip: "bg-bru-blue",
    title: "Track Progress",
    description:
      "Check tasks off with tactile satisfaction. Watch the progress bar fill up in bright lime green.",
    badge: "INSTANT FEEDBACK",
    badgeBg: "bg-bru-lime",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    index: "03",
    strip: "bg-bru-lime",
    title: "Secure by Design",
    description:
      "Dual JWT access & refresh tokens plus OAuth Google/GitHub sign-in. Your tasks stay private.",
    badge: "ENCRYPTED & SAFE",
    badgeBg: "bg-bru-purple",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const { user, loading } = useAuth();

  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stickerYellowRef = useRef<HTMLDivElement>(null);
  const stickerMainRef = useRef<HTMLDivElement>(null);
  const stickerLimeRef = useRef<HTMLDivElement>(null);
  const stickerBlueRef = useRef<HTMLDivElement>(null);
  const marqueeBandRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animations - explicitly animate to full opacity and clearProps
      gsap.fromTo(
        ".hero-badge",
        { y: -20, opacity: 0, rotation: -4 },
        { y: 0, opacity: 1, rotation: 1, duration: 0.5, ease: "back.out(1.8)", clearProps: "opacity,transform" }
      );

      gsap.fromTo(
        ".hero-title-line",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", clearProps: "opacity,transform" }
      );

      gsap.fromTo(
        ".hero-desc",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: "power2.out", clearProps: "opacity,transform" }
      );

      gsap.fromTo(
        ".hero-btn",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.45, delay: 0.25, ease: "back.out(1.5)", clearProps: "opacity,transform" }
      );

      gsap.fromTo(
        ".hero-sticker-wrap",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.6)", clearProps: "opacity" }
      );

      // 2. Parallax Scroll on Hero Sticker Stack
      if (heroRef.current) {
        if (stickerYellowRef.current) {
          gsap.to(stickerYellowRef.current, {
            y: -35,
            rotation: 14,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (stickerMainRef.current) {
          gsap.to(stickerMainRef.current, {
            y: 30,
            rotation: -6,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (stickerLimeRef.current) {
          gsap.to(stickerLimeRef.current, {
            y: -60,
            rotation: 180,
            scale: 1.15,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        if (stickerBlueRef.current) {
          gsap.to(stickerBlueRef.current, {
            x: -25,
            y: 35,
            rotation: -20,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }

      // 3. Marquee subtle dynamic scale on scroll
      if (marqueeBandRef.current) {
        gsap.to(marqueeBandRef.current, {
          rotation: -1,
          scale: 1.02,
          scrollTrigger: {
            trigger: marqueeBandRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // 4. Features Section Stagger - fromTo with clearProps and early start trigger
      if (featuresRef.current) {
        gsap.fromTo(
          ".feature-card",
          { y: 40, opacity: 0, rotation: (i) => (i % 2 === 0 ? -2 : 2) },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            stagger: 0.12,
            duration: 0.65,
            ease: "back.out(1.4)",
            clearProps: "all",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // 5. Bento Grid Showcase Stagger
      if (bentoRef.current) {
        gsap.fromTo(
          ".bento-card",
          { y: 35, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: bentoRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );

        // Bento animated progress bar fill
        gsap.fromTo(
          ".bento-progress-fill",
          { width: "0%" },
          {
            width: "80%",
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bentoRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 6. CTA Card Pop
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0.94, y: 30, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            clearProps: "all",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // Refresh ScrollTrigger to ensure accurate positions after DOM renders
      ScrollTrigger.refresh();
    }, mainRef);

    // Give DOM a frame to compute geometry accurately
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={mainRef} className="flex-1 overflow-x-hidden">
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 flex flex-col md:flex-row items-center gap-12"
      >
        <div className="flex-1 text-center md:text-left">
          <span className="hero-badge inline-flex items-center gap-2 bg-bru-surface border-2 border-bru-ink rounded-lg px-3 py-1.5 shadow-[var(--shadow-bru-sm)] rotate-1 text-sm font-bold text-bru-ink select-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Your tasks, one tactile place
          </span>

          <h1 className="mt-6 text-5xl sm:text-6xl font-bold text-bru-ink tracking-tighter leading-[0.95]">
            <span className="hero-title-line inline-block">Get things</span>
            <br />
            <span className="hero-title-line inline-block bg-bru-yellow px-2 border-y-2 border-bru-ink -rotate-1 mt-1 shadow-[var(--shadow-bru-sm)]">
              done.
            </span>
          </h1>

          <p className="hero-desc mt-6 text-lg text-bru-muted font-medium max-w-md mx-auto md:mx-0">
            TaskFlow keeps your to-dos bold, organized, and deeply satisfying to
            check off. Neo-brutalist energy without the corporate spreadsheet fluff.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {loading ? (
              <div className="h-12 w-44 rounded-lg animate-shimmer" />
            ) : user ? (
              <>
                <Link
                  href="/todos"
                  className="hero-btn bru-press inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-bold text-white bg-bru-primary border-2 border-bru-ink shadow-[var(--shadow-bru)] hover:bg-bru-primary-deep hover:shadow-[var(--shadow-bru-lg)]"
                >
                  Go to my tasks
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/todos"
                  className="hero-btn bru-press inline-flex items-center px-6 py-3 rounded-lg text-base font-bold text-bru-ink bg-bru-surface border-2 border-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-yellow"
                >
                  Open dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="hero-btn bru-press inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-bold text-white bg-bru-primary border-2 border-bru-ink shadow-[var(--shadow-bru)] hover:bg-bru-primary-deep hover:shadow-[var(--shadow-bru-lg)]"
                >
                  Get started — it&apos;s free
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="hero-btn bru-press inline-flex items-center px-6 py-3 rounded-lg text-base font-bold text-bru-ink bg-bru-surface border-2 border-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-yellow"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>

          <p className="mt-6 text-sm font-semibold text-bru-muted flex items-center gap-2 justify-center md:justify-start">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-bru-lime border border-bru-ink" />
            Free forever · Secure JWT sessions · Zero clutter
          </p>
        </div>

        {/* Hero sticker stack with GSAP Parallax */}
        <div className="hero-sticker-wrap relative w-64 h-64 sm:w-76 sm:h-76 shrink-0 select-none">
          {/* Background Yellow Card */}
          <div
            ref={stickerYellowRef}
            className="absolute inset-0 rotate-6 bg-bru-yellow border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)] flex items-end p-4 justify-between"
          >
            <span className="text-xs font-black tracking-widest text-bru-ink/60 uppercase">PRIORITY #1</span>
            <span className="text-xs font-bold bg-bru-surface border border-bru-ink px-1.5 py-0.5 rounded">TODAY</span>
          </div>

          {/* Main White Card with Checklists */}
          <div
            ref={stickerMainRef}
            className="absolute inset-0 -rotate-3 bg-bru-surface border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru-lg)] flex flex-col justify-center gap-3 px-6 transition-transform hover:rotate-0 duration-200"
          >
            <div className="flex items-center justify-between pb-1 border-b border-bru-ink/15">
              <span className="text-xs font-black tracking-wider text-bru-muted uppercase">ACTIVE SPRINT</span>
              <span className="text-xs font-bold text-bru-ink bg-bru-lime px-1.5 py-0.5 rounded border border-bru-ink">2 / 3 DONE</span>
            </div>
            {[
              { text: "Ship landing page", done: true },
              { text: "Refactor auth flow", done: true },
              { text: "Design brutalist UI", done: false },
            ].map((task, i) => (
              <div key={task.text} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full border-2 border-bru-ink flex items-center justify-center shrink-0 ${
                    task.done ? "bg-bru-lime" : "bg-bru-surface"
                  }`}
                >
                  {task.done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </span>
                <span
                  className={`text-sm font-bold ${
                    task.done ? "line-through text-bru-muted" : "text-bru-ink"
                  }`}
                >
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          {/* Lime Checkmark Floating Badge */}
          <div
            ref={stickerLimeRef}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-bru-lime border-[3px] border-bru-ink shadow-[var(--shadow-bru-sm)] flex items-center justify-center text-bru-ink cursor-pointer hover:scale-110 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          {/* Blue Decorative Stamp */}
          <div
            ref={stickerBlueRef}
            className="absolute -bottom-3 -left-4 px-3 py-1.5 rounded-lg bg-bru-blue border-[3px] border-bru-ink shadow-[var(--shadow-bru-sm)] rotate-12 flex items-center gap-1.5 text-white text-xs font-black uppercase tracking-wider"
          >
            <span>100% DONE</span>
          </div>
        </div>
      </section>

      {/* ─── Marquee band ─── */}
      <div
        ref={marqueeBandRef}
        className="overflow-hidden border-y-[3px] border-bru-ink bg-bru-primary rotate-1 scale-[1.02] py-3.5 shadow-[var(--shadow-bru-sm)] my-4 select-none"
      >
        <div className="flex w-max animate-bru-marquee">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>

      {/* ─── Features ─── */}
      <section ref={featuresRef} className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="inline-block bg-bru-blue text-white border-2 border-bru-ink rounded-lg px-3.5 py-1.5 shadow-[var(--shadow-bru-sm)] -rotate-1 text-xs sm:text-sm font-black tracking-wide uppercase">
            WHY TASKFLOW?
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-bru-ink tracking-tight">
            Built to be checked off.
          </h2>
          <p className="mt-3 text-bru-muted font-medium max-w-md mx-auto">
            Crafted for speed, clarity, and the irreplaceable feeling of striking tasks off your list.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.index}
              className="feature-card bru-card hover:shadow-[var(--shadow-bru-lg)] hover:-translate-x-1 hover:-translate-y-1 rounded-xl overflow-hidden transition-all duration-200 group flex flex-col"
            >
              <div className={`${feature.strip} border-b-2 border-bru-ink h-3.5`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-bru-ink text-white shadow-[var(--shadow-bru-sm)] group-hover:-rotate-6 transition-transform">
                    {feature.icon}
                  </span>
                  <span className="text-3xl font-extrabold text-bru-muted/25 tracking-tighter">
                    {feature.index}
                  </span>
                </div>
                <div className="mb-2">
                  <span className={`inline-block text-[11px] font-black uppercase px-2 py-0.5 rounded border border-bru-ink ${feature.badgeBg} text-bru-ink`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-bru-ink tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-bru-muted font-medium leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bento Grid: The Neo-Brutalist Workflow ─── */}
      <section ref={bentoRef} className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <span className="inline-block bg-bru-yellow text-bru-ink border-2 border-bru-ink rounded-lg px-3.5 py-1.5 shadow-[var(--shadow-bru-sm)] rotate-1 text-xs sm:text-sm font-black tracking-wide uppercase">
            THE WORKFLOW
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-bru-ink tracking-tight">
            Designed for daily momentum.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: Visual Progress Bar */}
          <div className="bento-card md:col-span-2 bru-card rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-[var(--shadow-bru-lg)] transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-bru-muted uppercase">REALTIME TRACKING</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-bru-lime border border-bru-ink text-bru-ink">80% COMPLETED</span>
              </div>
              <h3 className="text-2xl font-bold text-bru-ink tracking-tight mt-2">
                Watch your day fall into place.
              </h3>
              <p className="text-sm text-bru-muted font-medium mt-1 max-w-lg">
                As you check items off, the satisfying lime progress tracker gives you instant visual momentum.
              </p>
            </div>

            {/* Visual Progress Mockup */}
            <div className="mt-6">
              <div className="bru-well flex h-6 overflow-hidden rounded-lg">
                <div
                  className="bento-progress-fill h-full bg-bru-lime border-r-2 border-bru-ink transition-all duration-700"
                  style={{ width: "80%" }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-bold text-bru-muted">
                <span>8 of 10 tasks completed</span>
                <span className="text-bru-ink font-extrabold">+2 left to hit target 🔥</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Zero Bloat */}
          <div className="bento-card bru-card rounded-xl p-6 sm:p-8 flex flex-col justify-between bg-bru-yellow hover:shadow-[var(--shadow-bru-lg)] transition-all">
            <div>
              <span className="text-xs font-black tracking-widest text-bru-ink/70 uppercase">PHILOSOPHY</span>
              <h3 className="text-2xl font-bold text-bru-ink tracking-tight mt-2">
                Zero bloat.
              </h3>
              <p className="text-sm text-bru-ink/80 font-medium mt-2">
                No complex sub-sub-projects, no Gantt chart headaches. Just pure clarity.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["FAST", "CLEAN", "NO ADS", "OFFLINE READY"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-black bg-bru-surface border-2 border-bru-ink px-2.5 py-1 rounded-md shadow-[2px_2px_0px_#17140f]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Card 3: Keyboard & Responsive */}
          <div className="bento-card bru-card rounded-xl p-6 sm:p-8 flex flex-col justify-between bg-bru-blue text-white hover:shadow-[var(--shadow-bru-lg)] transition-all">
            <div>
              <span className="text-xs font-black tracking-widest text-white/80 uppercase">TACTILE CONTROLS</span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-2">
                Sticker-grade design.
              </h3>
              <p className="text-sm text-white/90 font-medium mt-2">
                High contrast, thick borders, and snappy micro-animations built for people who love tactile interfaces.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-bru-lime border-2 border-bru-ink text-bru-ink font-bold flex items-center justify-center text-sm shadow-[2px_2px_0px_#17140f]">
                ✓
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Click, check, and move on.
              </span>
            </div>
          </div>

          {/* Bento Card 4: Multi-device & Security */}
          <div className="bento-card md:col-span-2 bru-card rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-[var(--shadow-bru-lg)] transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-bru-muted uppercase">AUTH & SECURITY</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-bru-purple border border-bru-ink text-white">OAUTH + JWT</span>
              </div>
              <h3 className="text-2xl font-bold text-bru-ink tracking-tight mt-2">
                Sign in with Google, GitHub, or Email.
              </h3>
              <p className="text-sm text-bru-muted font-medium mt-1">
                Your todos are tied to your personal account with resilient session management and fast MongoDB queries.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bru-surface border-2 border-bru-ink text-xs font-bold text-bru-ink shadow-[var(--shadow-bru-sm)]">
                <span className="w-2.5 h-2.5 rounded-full bg-bru-lime" /> MongoDB Atlas
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bru-surface border-2 border-bru-ink text-xs font-bold text-bru-ink shadow-[var(--shadow-bru-sm)]">
                <span className="w-2.5 h-2.5 rounded-full bg-bru-blue" /> NextAuth v5
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bru-surface border-2 border-bru-ink text-xs font-bold text-bru-ink shadow-[var(--shadow-bru-sm)]">
                <span className="w-2.5 h-2.5 rounded-full bg-bru-yellow" /> GSAP ScrollTrigger
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA band ─── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20">
        <div ref={ctaRef} className="relative bru-card-lg rounded-xl overflow-hidden shadow-[var(--shadow-bru-xl)]">
          <div className="absolute inset-x-0 top-0 h-3.5 bg-bru-lime border-b-2 border-bru-ink" />
          <div className="p-10 sm:p-14 text-center">
            <span className="inline-block bg-bru-primary text-white border-2 border-bru-ink rounded-lg px-3.5 py-1 shadow-[var(--shadow-bru-sm)] -rotate-1 text-xs font-black tracking-wider uppercase mb-4">
              TAKE ACTION TODAY
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-bru-ink tracking-tight">
              Ready to make progress?
            </h2>
            <p className="mt-3 text-bru-muted font-medium max-w-md mx-auto text-base">
              Create your account in seconds and start crushing your to-do
              list with neo-brutalist joy.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={user ? "/todos" : "/register"}
                className="bru-press inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-bold text-bru-ink bg-bru-yellow border-2 border-bru-ink shadow-[var(--shadow-bru)] hover:bg-bru-lime hover:shadow-[var(--shadow-bru-lg)]"
              >
                {user ? "Open my tasks" : "Create free account"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/todos"
                className="bru-press inline-flex items-center px-8 py-3.5 rounded-lg text-base font-bold text-white bg-bru-blue border-2 border-bru-ink shadow-[var(--shadow-bru)] hover:bg-bru-blue-deep"
              >
                {user ? "Go to dashboard" : "Explore dashboard"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}