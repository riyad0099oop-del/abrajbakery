"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className={`flex items-center gap-1.5 font-headline font-bold text-sm transition-colors hover:text-secondary ${className}`}
      aria-label="تغيير اللغة"
    >
      <span className="material-symbols-outlined text-[18px]">language</span>
      <span>{locale === 'ar' ? 'English' : 'عربي'}</span>
    </button>
  );
}
