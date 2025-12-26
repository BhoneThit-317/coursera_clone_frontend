// src/app/(main)/layout.tsx
import { NavHeader } from "@/layout/nav-header";
import { Footer } from "@/layout/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
