"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function AuthWidget() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, startTransition] = React.useTransition();

  const onSignOut = () => {
    startTransition(async () => {
      await authClient.signOut();
      router.refresh();
    });
  };

  if (isPending) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-300">
        {t("loading")}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-300">
        <span>{t("loggedOut")}</span>
        <Button asChild size="sm">
          <Link href="/login">{t("login")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-900 shadow-sm backdrop-blur dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100">
      <span>
        {t("loggedInAs")} {session.user.email}
      </span>
      <Button variant="outline" size="sm" onClick={onSignOut} disabled={isSigningOut}>
        {isSigningOut ? t("signingOut") : t("logout")}
      </Button>
    </div>
  );
}
