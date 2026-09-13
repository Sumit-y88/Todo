"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
      "Jot down tasks with titles and optional descriptions. Everything in one clean, board-like list.",
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
      "Mark tasks done as you go and watch the progress bar fill up. Filter by all, active, or finished.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    index: "03",
    strip: "bg-bru-lime",
    title: "Secure by design",
    description:
      "Sign in with JWT-based auth and refresh-token sessions. Your tasks, only yours.",
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

  return (
    <main className="flex-1">
      {/* ─── Hero ─── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center gap-2 bg-bru-surface border-2 border-bru-ink rounded-lg px-3 py-1.5 shadow-[var(--shadow-bru-sm)] rotate-1 text-sm font-bold text-bru-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Your tasks, one place
          </span>

          <h1 className="mt-6 text-5xl sm:text-6xl font-bold text-bru-ink tracking-tighter leading-[0.95]">
            Get things
            <br />
            <span className="bg-bru-yellow px-2 border-y-2 border-bru-ink">
              done.
            </span>
          </h1>

          <p className="mt-6 text-lg text-bru-muted font-medium max-w-md mx-auto md:mx-0">
            TaskFlow keeps your to-dos bold, organized, and satisfying to
            check off. No fluff — just a punchy list that gets out of your way.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {loading ? (
              <div className="h-12 w-44 rounded-lg animate-shimmer" />
            ) : user ? (
              <>
                <Link
                  href="/todos"
                  className="bru-press inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-bold text-white bg-bru-primary border-2 border-bru-ink shadow-[var(--shadow-bru)] hover:bg-bru-primary-deep hover:shadow-[var(--shadow-bru-lg)]"
                >
                  Go to my tasks
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/todos"
                  className="bru-press inline-flex items-center px-6 py-3 rounded-lg text-base font-bold text-bru-ink bg-bru-surface border-2 border-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-yellow"
                >
                  Open dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="bru-press inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-bold text-white bg-bru-primary border-2 border-bru-ink shadow-[var(--shadow-bru)] hover:bg-bru-primary-deep hover:shadow-[var(--shadow-bru-lg)]"
                >
                  Get started — it&apos;s free
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="bru-press inline-flex items-center px-6 py-3 rounded-lg text-base font-bold text-bru-ink bg-bru-surface border-2 border-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-yellow"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>

          <p className="mt-6 text-sm font-semibold text-bru-muted">
            Free forever · Secure JWT auth · No sign-up caps
          </p>
        </div>

        {/* Hero sticker stack */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 shrink-0 select-none">
          <div className="absolute inset-0 rotate-6 bg-bru-yellow border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)]" />
          <div className="absolute inset-0 -rotate-3 bg-bru-surface border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru-lg)] flex flex-col justify-center gap-3 px-6">
            {["Ship landing page", "Refactor auth flow", "Reply to Sara"].map(
              (task, i) => (
                <div key={task} className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full border-2 border-bru-ink flex items-center justify-center shrink-0 ${
                      i === 0 ? "bg-bru-lime" : "bg-bru-surface"
                    }`}
                  >
                    {i === 0 && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      i === 0 ? "line-through text-bru-muted" : "text-bru-ink"
                    }`}
                  >
                    {task}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-bru-lime border-[3px] border-bru-ink shadow-[var(--shadow-bru-sm)] flex items-center justify-center text-bru-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -left-3 w-9 h-9 rounded-lg bg-bru-blue border-[3px] border-bru-ink shadow-[var(--shadow-bru-sm)] rotate-12" />
        </div>
      </section>

      {/* ─── Marquee band ─── */}
      <div className="overflow-hidden border-y-[3px] border-bru-ink bg-bru-primary rotate-1 scale-[1.02] py-3">
        <div className="flex w-max animate-bru-marquee">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>

      {/* ─── Features ─── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-bru-blue text-white border-2 border-bru-ink rounded-lg px-3 py-1.5 shadow-[var(--shadow-bru-sm)] -rotate-1 text-sm font-bold tracking-wide uppercase">
            Why TaskFlow?
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-bru-ink tracking-tight">
            Built to be checked off.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.index}
              className="bru-card hover:shadow-[var(--shadow-bru-lg)] hover:-translate-x-px hover:-translate-y-px rounded-xl overflow-hidden transition-all duration-150 group"
            >
              <div className={`${feature.strip} border-b-2 border-bru-ink h-3`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-bru-ink text-white shadow-[var(--shadow-bru-sm)] group-hover:-rotate-6 transition-transform">
                    {feature.icon}
                  </span>
                  <span className="text-4xl font-bold text-bru-muted/30 tracking-tighter">
                    {feature.index}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-bru-ink tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-bru-muted font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA band ─── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative bru-card-lg rounded-xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-3 bg-bru-lime border-b-2 border-bru-ink" />
          <div className="p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-bru-ink tracking-tight">
              Ready to make progress?
            </h2>
            <p className="mt-3 text-bru-muted font-medium max-w-md mx-auto">
              Create your account in seconds and start crushing your to-do
              list today.
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
                {user ? "Go to dashboard" : "Take a peek"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}