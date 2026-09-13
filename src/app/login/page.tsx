import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In — TaskFlow",
  description: "Sign in to your TaskFlow account to manage your tasks.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left: Sticker wall */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 select-none">
          <div className="relative w-72 h-72">
            <div className="absolute inset-8 rotate-3 bg-bru-yellow border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)]" />
            <div className="absolute inset-8 -rotate-3 bg-bru-lime border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)]" />
            <div className="absolute inset-8 bg-bru-blue border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)] flex items-center justify-center text-white">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <div className="absolute -top-2 right-2 w-12 h-12 rounded-full bg-bru-primary border-4 border-bru-ink shadow-[var(--shadow-bru)] rotate-12" />
            <div className="absolute bottom-2 -left-2 w-10 h-10 rounded-xl bg-bru-purple border-4 border-bru-ink shadow-[var(--shadow-bru)] -rotate-6" />
          </div>
          <h2 className="text-4xl font-bold text-bru-ink mt-10 text-center tracking-tight">
            Welcome back to
            <br />
            <span className="bg-bru-yellow px-2 border-y-2 border-bru-ink">
              TaskFlow
            </span>
          </h2>
          <p className="text-bru-muted font-semibold mt-4 text-center max-w-xs">
            Your tasks, organized with attitude.
          </p>
        </div>

        {/* Right: Form card */}
        <div className="w-full max-w-md bru-card-lg rounded-xl p-8 sm:p-10">
          <div className="mb-8 inline-block bg-bru-primary text-white border-2 border-bru-ink rounded-lg px-3 py-1 shadow-[var(--shadow-bru-sm)] rotate-1">
            <h1 className="text-xl font-bold tracking-tight">Sign In</h1>
          </div>
          <p className="text-bru-muted text-sm font-semibold mt-2 mb-6">
            Enter your credentials to continue
          </p>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <p className="text-center text-sm text-bru-muted font-medium mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-bru-primary font-bold border-b-2 border-bru-primary hover:bg-bru-primary hover:text-white hover:border-bru-primary transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}