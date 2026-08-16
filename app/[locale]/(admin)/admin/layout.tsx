"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    const match = pathname.match(/^\/(ar|en)/);
    const locale = match ? match[1] : 'ar';
    router.push(`/${locale}/admin/login`);
  };

  // If the path contains /login, don't show the sidebar
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "الرئيسية", href: "/admin", icon: "dashboard" },
    { name: "أقسام المنتجات", href: "/admin/categories", icon: "category" },
    { name: "المنتجات", href: "/admin/products", icon: "inventory_2" },
    { name: "الخدمات", href: "/admin/services", icon: "room_service" },
    { name: "العروض", href: "/admin/offers", icon: "local_offer" },
    { name: "الفروع", href: "/admin/branches", icon: "store" },
    { name: "الإعدادات", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-surface-dim flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-surface border-l border-outline-variant/30 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-outline-variant/30">
            <h1 className="text-2xl font-headline font-bold text-primary">لوحة الإدارة</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {navItems.map((item) => {
                const isActive = pathname.endsWith(item.href) || (item.href !== "/admin" && pathname.includes(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-headline text-lg ${
                        isActive 
                          ? "bg-primary-container text-on-primary-container font-bold" 
                          : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-outline-variant/30">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-headline"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              العودة للموقع
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-surface h-16 border-b border-outline-variant/30 flex items-center justify-between px-4 lg:px-8">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-error hover:bg-error-container/50 px-4 py-2 rounded-xl transition-colors font-bold font-headline"
            >
              <span className="material-symbols-outlined">logout</span>
              تسجيل الخروج
            </button>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-bold font-headline">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
