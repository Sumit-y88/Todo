"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <nav className="sticky top-0 z-40 bg-bru border-b-[3px] border-bru-ink px-4 sm:px-6">
      <div className="max-w-4xl mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-bru-blue border-2 border-bru-ink text-white shadow-[var(--shadow-bru-sm)] group-hover:-rotate-6 transition-transform">
            <svg
              width="18"
              height="18"
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
          <span className="text-xl font-bold text-bru-ink tracking-tight">
            Task<span className="text-bru-primary">Flow</span>
          </span>
        </Link>

        {/* User menu / auth links */}
        {!loading && !user && (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="bru-chip px-4 py-2 rounded-lg text-sm font-bold text-bru-ink hover:bg-bru-yellow"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bru-press inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-bru-primary border-2 border-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-primary-deep"
            >
              Sign up
            </Link>
          </div>
        )}
        {user && (
          <div className="flex items-center gap-3">
            <Link
              href="/todos"
              className="bru-press hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black text-bru-ink bg-bru-yellow border-2 border-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-lime"
            >
              <span>TASKS</span>
              <span className="font-extrabold">→</span>
            </Link>
            <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="
                flex items-center justify-center w-11 h-11 rounded-full
                bg-bru-yellow border-2 border-bru-ink
                text-bru-ink font-extrabold text-sm
                shadow-[var(--shadow-bru-sm)] bru-press
              "
              aria-label="User menu"
            >
              {initials}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div
                className="
                  absolute right-0 mt-3 w-56
                  bg-bru-surface border-2 border-bru-ink
                  shadow-[var(--shadow-bru-lg)] overflow-hidden
                  animate-scale-in origin-top-right
                "
              >
                <div className="px-4 py-3 bg-bru-yellow border-b-2 border-bru-ink">
                  <p className="font-bold text-bru-ink text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-bru-muted font-medium truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="
                    w-full text-left px-4 py-3 text-sm font-bold text-bru-red
                    hover:bg-bru-red hover:text-white transition-colors
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </nav>
  );
}