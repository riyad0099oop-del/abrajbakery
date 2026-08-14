"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  const footerLinks = [
    { label: nav("products"), href: "/products" },
    { label: nav("offers"), href: "/offers" },
    { label: nav("services"), href: "/services" },
    { label: nav("about"), href: "/about" },
    { label: nav("branches"), href: "/branches" },
    { label: nav("contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 mt-auto">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block relative w-40 h-14 transition-transform hover:scale-105">
               <Image 
                  src="/images/1786624283616.png" 
                  alt="Discount Tower" 
                  fill
                  className="object-contain object-right"
                />
            </Link>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed max-w-sm">
              {t("aboutText")}
            </p>
            <Link href="/about" className="font-headline font-bold text-primary text-sm hover:text-secondary transition-colors w-fit">
              {t("readMore")}
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-headline text-base font-bold text-primary mb-1 relative inline-block">
              {t("quickLinks")}
              <span className="absolute -bottom-1 right-0 w-6 h-1 bg-secondary rounded-full"></span>
            </h3>
            {footerLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-headline text-base font-bold text-primary mb-1 relative inline-block">
              {t("contactUs")}
              <span className="absolute -bottom-1 right-0 w-6 h-1 bg-secondary rounded-full"></span>
            </h3>
            <a href="tel:+966503890394" className="flex items-center gap-2 font-body text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" dir="ltr">
              <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              <span>+966 50 389 0394</span>
            </a>
            <a href="mailto:info@abrajsweets.com" className="flex items-center gap-2 font-body text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" dir="ltr">
              <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
              <span>info@abrajsweets.com</span>
            </a>
            <div className="flex gap-2 mt-1">
              {/* Snapchat */}
              <a href="#" aria-label="Snapchat" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-[#FFFC00] hover:text-black hover:-translate-y-1 hover:border-[#FFFC00] hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4"><path d="M439.1 278.4c-22.1-7.1-51.5-12.8-51.5-12.8-8-1.5-22.6-4.6-28.7-.3-6 4.3-5.2 20.3-4.4 28.5 2.1 21.6 9 65 9.3 70 1.3 22-8.3 46.1-23.7 61.2-12.8 12.5-33.8 18.5-56.3 16.9-5.1-.3-10-1-14.7-2-6.5-1.3-12-3.1-16.7-5-5-2-9-4-11.7-5.5-5.9-3.2-10.7-3.6-13.8-3.5-3.1 .1-7.8 .7-13.8 3.5-2.7 1.5-6.8 3.5-11.7 5.5-4.8 1.9-10.3 3.6-16.7 5-4.6 1-9.5 1.7-14.7 2-22.5 1.6-43.5-4.4-56.3-16.9-15.4-15.1-25-39.2-23.7-61.2 .3-5 7.2-48.4 9.3-70 .8-8.2 1.6-24.2-4.4-28.5-6.1-4.3-20.7-1.2-28.7 .3 0 0-29.4 5.7-51.5 12.8-5 1.6-11 3.5-17.7 5.6-5.8 1.8-8.8 .9-9.1-.6-.5-2.5 .6-5.8 4.2-10.6 7.6-10.2 17.6-19 28.5-27.1 23-16.9 50.8-30.8 54.3-32.3 .7-.3 3.6-1.5 8.1-1.3 5 .2 11.1 2 17.6 6 12 7.3 22.8 19 32.1 30.6 6.3 7.8 14.8 7.3 19.3 2.9 4-3.9 3.6-11-.6-16.4-15-18.9-29.7-33.5-44-46.1 6.8-58.8 28.2-111 61.5-146.4 34.6-36.9 77-54.8 123.6-52.6 46.5-2.2 88.9 15.7 123.6 52.6 33.3 35.5 54.6 87.6 61.5 146.4-14.3 12.5-29 27.2-44 46.1-4.2 5.4-4.6 12.5-.6 16.4 4.5 4.4 13 4.9 19.3-2.9 9.3-11.6 20.1-23.3 32.1-30.6 6.5-4 12.6-5.8 17.6-6 4.6-.2 7.5 1 8.1 1.3 3.5 1.5 31.3 15.4 54.3 32.3 10.9 8.1 20.9 16.8 28.5 27.1 3.7 4.9 4.8 8.1 4.2 10.6-.4 1.5-3.4 2.5-9.1 .6-6.6-2-12.7-4-17.7-5.6z"/></svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@d.t.ksa1?_r=1&_t=ZS-98pOm8OfChr" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-[#010101] hover:text-white hover:-translate-y-1 hover:border-[#010101] hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.12-1.02 4.19-2.5 5.55-1.53 1.43-3.65 2.14-5.74 2.13-2.07-.02-4.11-.78-5.61-2.19-1.49-1.43-2.35-3.41-2.43-5.46-.07-1.92.59-3.87 1.83-5.32 1.17-1.39 2.87-2.27 4.7-2.52.48-.06.97-.09 1.46-.07.01 1.34 0 2.68.01 4.02-.27.02-.55.05-.83.08-1.04.14-2.04.66-2.76 1.45-.73.81-1.16 1.89-1.16 2.99.01 1.07.41 2.11 1.12 2.91.73.81 1.76 1.3 2.86 1.39 1.12.09 2.25-.19 3.12-.87.87-.69 1.4-1.74 1.51-2.85.06-.57.06-1.16.05-1.73-.04-4.88-.04-9.76-.05-14.64z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/d.t.ksa1?igsh=MTJvYWh5OGY4c2k5eg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-[#E1306C] hover:text-white hover:-translate-y-1 hover:border-[#E1306C] hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/share/1DNqkQgg3T/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 hover:border-[#1877F2] hover:shadow-lg transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Payment Methods */}
        <div className="mt-10 pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-body text-xs text-on-surface-variant/80">
            {t("copyright")} {new Date().getFullYear()} ©
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2" aria-label="طرق الدفع">
            {/* Visa */}
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" aria-label="Visa">
              <rect width="36" height="24" rx="4" fill="#1434CB"/>
              <path d="M14.53 16.48H12.63L13.82 9.07H15.72L14.53 16.48ZM21.36 9.24C20.98 9.09 20.37 8.93 19.6 8.93C17.75 8.93 16.44 9.9 16.43 11.29C16.41 12.32 17.35 12.89 18.06 13.24C18.79 13.6 19.04 13.82 19.04 14.13C19.03 14.61 18.45 14.82 17.9 14.82C17.06 14.82 16.52 14.57 16.14 14.4L15.77 16.12C16.26 16.34 17.15 16.53 18.08 16.54C20.04 16.54 21.3 15.58 21.32 14.11C21.33 13.31 20.83 12.7 19.72 12.18C19.05 11.83 18.64 11.64 18.64 11.28C18.65 10.96 19.01 10.63 19.78 10.63C20.44 10.62 20.93 10.77 21.28 10.93L21.36 9.24ZM26.4 9.07H24.94C24.49 9.07 24.12 9.2 23.95 9.61L20.88 16.48H22.88L23.28 15.38H25.72L25.95 16.48H27.72L26.4 9.07ZM23.83 13.88L24.64 11.68L25.1 13.88H23.83ZM11.96 9.07L10.12 14.12L9.91 13.06C9.55 11.85 8.44 9.77 7.15 9.09L8.98 16.48H10.98L13.96 9.07H11.96Z" fill="white"/>
            </svg>
            {/* Mastercard */}
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" aria-label="Mastercard">
              <rect width="36" height="24" rx="4" fill="#252525"/>
              <circle cx="14" cy="12" r="7" fill="#EB001B"/>
              <circle cx="22" cy="12" r="7" fill="#F79E1B"/>
              <path d="M18 6.84C19.5 8.16 20.46 10.08 20.46 12.24C20.46 14.4 19.5 16.32 18 17.64C16.5 16.32 15.54 14.4 15.54 12.24C15.54 10.08 16.5 8.16 18 6.84Z" fill="#FF5F00"/>
            </svg>
            {/* Mada */}
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" aria-label="Mada">
              <rect width="36" height="24" rx="4" fill="#00A7A1"/>
              <text x="18" y="14.5" fontFamily="sans-serif" fontWeight="900" fontSize="8" fill="white" textAnchor="middle">mada</text>
            </svg>
            {/* Apple Pay */}
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" aria-label="Apple Pay">
              <rect width="36" height="24" rx="4" fill="#000000"/>
              <path d="M12.98 11.23C12.97 10.15 13.86 9.61 13.9 9.59C13.4 8.86 12.63 8.76 12.36 8.75C11.71 8.68 11.08 9.14 10.75 9.14C10.42 9.14 9.91 8.75 9.37 8.76C8.66 8.77 8.01 9.18 7.64 9.82C6.89 11.12 7.45 13.05 8.18 14.1C8.54 14.61 8.95 15.18 9.51 15.16C10.05 15.14 10.25 14.81 10.9 14.81C11.55 14.81 11.74 15.16 12.31 15.15C12.89 15.14 13.25 14.63 13.6 14.12C14.01 13.53 14.18 12.95 14.19 12.92C14.17 12.91 12.99 12.46 12.98 11.23Z" fill="white"/>
              <path d="M12.11 8.02C12.4 7.67 12.59 7.18 12.54 6.69C12.12 6.71 11.6 6.97 11.3 7.32C11.03 7.63 10.8 8.13 10.86 8.61C11.34 8.65 11.82 8.37 12.11 8.02Z" fill="white"/>
              <text x="15.5" y="14.2" fontFamily="sans-serif" fontWeight="bold" fontSize="7" fill="white">Pay</text>
            </svg>
          </div>

          <div className="flex items-center gap-1 text-xs text-on-surface-variant/80 font-body">
            {t("madeWithLove")} <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
