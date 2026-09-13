import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "TaskFlow — Get Things Done",
  description:
    "A bold, sticker-heavy todo app that makes task management feel fun. Sign up free and start crushing your to-do list.",
};

export default function HomeRoute() {
  return (
    <>
      <Navbar />
      <HomePage />
      <footer className="border-t-[3px] border-bru-ink bg-bru-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-bru-blue border-2 border-bru-ink text-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </span>
            <span className="font-bold text-bru-ink tracking-tight">
              Task<span className="text-bru-primary">Flow</span>
            </span>
          </div>
          <p className="text-sm font-semibold text-bru-muted">
            © {new Date().getFullYear()} TaskFlow · Keep it checked off.
          </p>
          <Link
            href="/todos"
            className="text-sm font-bold text-bru-primary border-b-2 border-bru-primary hover:bg-bru-primary hover:text-white transition-colors"
          >
            Open the app
          </Link>
        </div>
      </footer>
    </>
  );
}