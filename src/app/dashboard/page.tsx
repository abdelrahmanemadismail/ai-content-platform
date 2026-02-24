import { getLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ModeToggle } from '@/components/theme-toggle';
import { getVerifiedSession } from '@/lib/dal';
import { LogoutButton } from '@/components/auth/logout-button';
import type { Locale } from '@/lib/i18n';
import Link from 'next/link';

export default async function DashboardPage() {
  const locale = await getLocale() as Locale;
  await getVerifiedSession();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        <LocaleSwitcher currentLocale={locale} />
        <ModeToggle />
      </div>

      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Session active
            </p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium"
            >
              Home
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium transition-colors"
            >
              Back to Home
            </Link>
          </nav>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="ml-64 w-[calc(100%-16rem)] p-8">
        <div className="max-w-6xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome to your Dashboard</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              This is a protected page. Only authenticated users can see this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-2">
              <h3 className="font-semibold text-lg">Create Content</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Start creating new content with AI-powered assistance
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-2">
              <h3 className="font-semibold text-lg">Analytics</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Track your content performance and engagement metrics
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-2">
              <h3 className="font-semibold text-lg">Settings</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Customize your profile and preferences
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Authentication Proxy Active
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This page is protected by the authentication proxy. Session data is verified on every request.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
