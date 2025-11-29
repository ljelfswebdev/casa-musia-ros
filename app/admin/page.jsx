import { getCurrentUser } from '@helpers/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const user = await getCurrentUser();

  if (!user) {
    // not logged in → show a simple message / link
    return (
      <div className="card space-y-2 pt-24 bg-tertiary">
        <h2 className="text-lg font-semibold">Admin area</h2>
        <p className="text-sm text-gray-600">
          You&apos;re not logged in. Please{' '}
          <Link href="/admin/login" className="text-blue-600 underline">
            log in
          </Link>.
        </p>
      </div>
    );
  }

  // logged in → show admin shell
  return (
    <div className="space-y-4 pt-24 bg-tertiary">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <form action="/api/auth/logout" method="post">
          <button className="button button--tertiary text-xs px-3 py-1" type="submit">
            Logout
          </button>
        </form>
      </header>

      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/admin/pages" className="button button--secondary w-full">
            Pages
          </Link>
        </li>
      </ul>
    </div>
  );
}