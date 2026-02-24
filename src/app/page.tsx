import { getLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ModeToggle } from '@/components/theme-toggle';
import type { Locale } from '@/lib/i18n';
import { verifySession } from '@/lib/dal';
import Link from 'next/link';

export default async function WelcomePage() {
  const locale = await getLocale() as Locale;
  const session = await verifySession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        <LocaleSwitcher currentLocale={locale} />
        <ModeToggle />
      </div>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-center">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Welcome to AI Content Platform
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Create, manage, and grow your content with AI-powered tools
            </p>
          </div>

          {session ? (
            <div className="space-y-4">
              <p className="text-lg text-green-600 dark:text-green-400">
                You are logged in
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                Get started by logging in with the account provided by your admin
              </p>
              <div className="flex justify-center">
                <Link
                  href="/login"
                  className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              A modern platform for content creators and teams
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
