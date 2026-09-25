"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";

type Provider = "google" | "github";

const providers: { id: Provider; label: string }[] = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
];

export default function OAuthButtons({ callbackUrl = "/todos" }: { callbackUrl?: string }) {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleSignIn = async (provider: Provider) => {
    setLoadingProvider(provider);
    await signIn(provider, { redirectTo: callbackUrl, callbackUrl });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative my-1 text-center text-xs font-bold text-bru-muted">
        <span className="relative z-10 bg-bru-surface px-3">OR</span>
        <div className="absolute inset-x-0 top-1/2 border-t-2 border-bru-ink/20" />
      </div>
      {providers.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="secondary"
          loading={loadingProvider === provider.id}
          disabled={loadingProvider !== null}
          onClick={() => handleSignIn(provider.id)}
          className="w-full"
        >
          {provider.label}
        </Button>
      ))}
    </div>
  );
}
