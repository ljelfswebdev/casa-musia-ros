// app/admin/layout.jsx
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <section className="bg-tertiary pt-24">
      <div className="container py-6 space-y-4">
        {children}
      </div>
      
    </section>
  );
}