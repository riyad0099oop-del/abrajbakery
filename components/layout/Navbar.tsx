"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  const allLinks = [
    { label: t("home"), href: "/" },
    { label: t("products"), href: "/products" },
    { label: t("offers"), href: "/offers" },
    { label: t("about"), href: "/about" },
    { label: t("services"), href: "/services" },
    { label: t("branches"), href: "/branches" },
    { label: t("contact"), href: "/contact" },
  ];

  const rightLinks = [
    { label: t("home"), href: "/" },
    { label: t("products"), href: "/products" },
    { label: t("offers"), href: "/offers" },
  ];

  const leftLinks = [
    { label: t("about"), href: "/about" },
    { label: t("services"), href: "/services" },
    { label: t("branches"), href: "/branches" },
    { label: t("contact"), href: "/contact" },
  ];
  
  // Zustand store
  const { openCart, getTotalItems } = useCartStore();
  
  // Hydration fix for zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className={`hidden lg:block sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}>
        <nav className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 py-2"
            : "bg-surface/80 backdrop-blur-sm py-4"
        }`}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between relative">
            {/* Left Section (Placeholder for symmetry) */}
            <div className="flex w-1/4 z-10"></div>
            
            {/* Center: Navigation Links */}
            <div className="flex flex-1 items-center justify-center z-10">
              <ul className="flex items-center gap-6 xl:gap-8">
                {rightLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className={`relative whitespace-nowrap font-headline text-[15px] font-bold transition-colors duration-200 ${
                        pathname === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface hover:text-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                
                {/* Spacer for Absolute Logo */}
                <li className="w-48 xl:w-56"></li>

                {leftLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className={`relative whitespace-nowrap font-headline text-[15px] font-bold transition-colors duration-200 ${
                        pathname === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface hover:text-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section (Utilities) - Flex end aligns them to the far left in RTL */}
            <div className="flex items-center justify-end gap-3 z-10 w-1/4">
              <LanguageSwitcher className="text-on-surface" />
              <Link href="/admin/login" title="لوحة التحكم" className="text-on-surface hover:text-secondary transition-colors bg-surface-variant/50 p-2 rounded-full shadow-sm hover:shadow-md">
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              </Link>
              <button className="text-on-surface hover:text-secondary transition-colors relative bg-surface-variant/50 p-2 rounded-full shadow-sm hover:shadow-md" onClick={openCart}>
                <span className="material-symbols-outlined text-[20px]">local_mall</span>
                {mounted && getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-bold shadow-sm border border-white">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Absolute Center Logo */}
            <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group">
              <div className="relative w-36 h-16 xl:w-44 xl:h-20">
                <Image 
                  src="/images/1786624083357.png" 
                  alt="Discount Tower" 
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav className="m-2">
          <div className="bg-surface/95 backdrop-blur-md rounded-2xl shadow-lg flex flex-col pt-3 pb-1 border border-outline-variant/30">
            {/* Top Row: Utilities & Logo */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-outline-variant/20">
              
              {/* Left Utilities (Cart & Lang & Admin) */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={openCart}
                  className="bg-primary hover:bg-secondary text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">local_mall</span>
                  <span className="hidden sm:inline">{t("cart")}</span>
                  {mounted && getTotalItems() > 0 && (
                    <span className="bg-white text-primary w-4 h-4 flex items-center justify-center rounded-full text-[9px] mx-1 font-bold shadow-sm">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
                <LanguageSwitcher className="text-on-surface" />
                <Link href="/admin/login" title="لوحة التحكم" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
                </Link>
              </div>

              {/* Right Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-primary font-headline font-bold text-sm">{t("brand")}</span>
                <div className="relative w-12 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image 
                    src="/images/1786624083357.png" 
                    alt="Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Bottom Row: Navigation */}
            <div className="flex overflow-x-auto hide-scrollbar gap-5 px-4 pt-3 pb-2 items-center">
              {allLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href as any}
                    className={`whitespace-nowrap font-headline text-[11px] sm:text-xs transition-colors relative pb-1.5 ${
                      isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-secondary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-md" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
