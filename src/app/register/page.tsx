import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account — TaskFlow",
  description: "Create your TaskFlow account and start managing tasks.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left: Sticker wall */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 select-none">
          <div className="relative w-72 h-72">
            <div className="absolute inset-8 rotate-3 bg-bru-purple border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)]" />
            <div className="absolute inset-8 -rotate-3 bg-bru-primary border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)]" />
            <div className="absolute inset-8 bg-bru-lime border-4 border-bru-ink rounded-xl shadow-[var(--shadow-bru)] flex items-center justify-center text-bru-ink">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="absolute -top-2 left-2 w-12 h-12 rounded-full bg-bru-yellow border-4 border-bru-ink shadow-[var(--shadow-bru)] -rotate-12" />
            <div className="absolute bottom-2 right-0 w-10 h-10 rounded-xl bg-bru-blue border-4 border-bru-ink shadow-[var(--shadow-bru)] rotate-6" />
          </div>
          <h2 className="text-4xl font-bold text-bru-ink mt-10 text-center tracking-tight">
            Join
            <br />
            <span className="bg-bru-lime px-2 border-y-2 border-bru-ink">
              TaskFlow
            </span>
          </h2>
          <p className="text-bru-muted font-semibold mt-4 text-center max-w-xs">
            Start organizing your life in seconds.
          </p>
        </div>

        {/* Right: Form card */}
        <div className="w-full max-w-md bru-card-lg rounded-xl p-8 sm:p-10">
          <div className="mb-8 inline-block bg-bru-blue text-white border-2 border-bru-ink rounded-lg px-3 py-1 shadow-[var(--shadow-bru-sm)] -rotate-1">
            <h1 className="text-xl font-bold tracking-tight">Create Account</h1>
          </div>
          <p className="text-bru-muted text-sm font-semibold mt-2 mb-6">
            Fill in your details to get started
          </p>

          <RegisterForm />

          <p className="text-center text-sm text-bru-muted font-medium mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-bru-primary font-bold border-b-2 border-bru-primary hover:bg-bru-primary hover:text-white hover:border-bru-primary transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}