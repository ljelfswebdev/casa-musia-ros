'use client';

import useSWR from 'swr';
import Link from 'next/link';
import toast from 'react-hot-toast';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function AdminPagesList() {
  const { data, isLoading, mutate } = useSWR('/api/admin/pages', fetcher);

  async function createPage() {
    const title = prompt('Page title?');
    if (!title) return;
    const slug = prompt('Slug (url segment)?', title.toLowerCase().replace(/\s+/g,'-'));
    if (!slug) return;
    const r = await fetch('/api/admin/pages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, title }),
    });
    if (!r.ok) return toast.error('Create failed');
    toast.success('Page created');
    mutate();
  }

  async function del(id) {
    if (!confirm('Delete this page?')) return;
    const r = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
    if (!r.ok) return toast.error('Delete failed');
    toast.success('Deleted');
    mutate();
  }

  if (isLoading) return <div className="card">Loading…</div>;

  const rows = data?.items || [];

  return (
    <div className="space-y-4 pt-24 pb-10 bg-tertiary">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pages</h2>

        <form action="/api/auth/logout" method="post">
          <button className="button button--tertiary text-xs px-3 py-1" type="submit">
            Logout
          </button>
        </form>
      </div>
      <button className="button button--primary" onClick={createPage}>
          + New Page
        </button>

        <div className="card">
          {/* Header row – desktop only */}
          <div className="hidden md:grid grid-cols-[2fr,1.5fr,1fr,auto] gap-4 border-b pb-2 text-xs font-medium text-gray-500">
            <div>Title</div>
            <div>Slug</div>
            <div>Template</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {rows.map((p) => (
              <div
                key={p._id}
                className="
                  py-3
                  flex flex-col gap-2
                  md:grid md:grid-cols-[2fr,1.5fr,1fr,auto] md:items-center md:gap-4
                "
              >
                {/* Title */}
                <div className="text-sm font-medium">
                  {p.title}
                  <div className="md:hidden text-xs text-gray-500">
                    /{p.slug}
                  </div>
                </div>

                {/* Slug – hidden label on mobile since we show it under title */}
                <div className="hidden md:block text-sm text-gray-700">
                  /{p.slug}
                </div>

                {/* Template */}
                <div className="text-xs text-gray-500">
                  {p.templateKey}
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end md:justify-end w-full md:w-auto">
                  <Link
                    href={`/admin/pages/${p._id}`}
                    className="button button--secondary w-full md:w-auto"
                  >
                    Edit
                  </Link>
                  <button
                    className="button button--tertiary w-full md:w-auto"
                    onClick={() => del(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {!rows.length && (
              <div className="py-6 text-center text-gray-500 text-sm">
                No pages yet. Use &quot;New Page&quot; to create one.
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
