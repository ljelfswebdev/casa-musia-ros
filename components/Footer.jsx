export default function Footer() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || '';

  return (
    <footer className="bg-primary text-white">
      <div className="container py-6 text-sm text-center text-white">
        &copy; {new Date().getFullYear()} {projectName}
      </div>
    </footer>
  );
}