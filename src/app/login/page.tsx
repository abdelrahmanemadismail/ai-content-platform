import { useTranslations } from "next-intl";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#f5f5f4,_#ffffff_45%,_#f4f4f5_75%)] px-6 py-16 dark:bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_45%,_#000000_75%)]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-emerald-200/60 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl dark:bg-blue-500/10" />
      </div>
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t("welcomeLabel")}
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            {t("loginTitle")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("loginSubtitle")}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
