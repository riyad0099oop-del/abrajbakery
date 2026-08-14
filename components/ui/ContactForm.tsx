"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    // محاكاة إرسال البيانات
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // تجهيز رسالة الواتساب
      const text = `مرحباً أبراج للحلويات،%0A%0Aالاسم: ${name}%0Aالجوال: ${phone}%0A%0Aالرسالة:%0A${message}`;
      const whatsappUrl = `https://wa.me/966503890394?text=${text}`;
      
      // فتح الواتساب في نافذة جديدة
      window.open(whatsappUrl, '_blank');
      
      // إخفاء رسالة النجاح بعد 5 ثواني
      setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 5000);
      
    }, 1500);
  };

  return (
    <div>
      {isSuccess && (
        <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <p className="font-body text-sm font-bold">تم الإرسال بنجاح! سيتم تحويلك للواتساب...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="block font-body text-sm font-bold text-primary mb-2">{t("labelName")}</label>
          <input name="name" type="text" id="name" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder={t("placeholderName")} required />
        </div>
        
        <div>
          <label htmlFor="phone" className="block font-body text-sm font-bold text-primary mb-2">{t("labelPhone")}</label>
          <input name="phone" type="tel" id="phone" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="05x xxx xxxx" required />
        </div>
        
        <div>
          <label htmlFor="message" className="block font-body text-sm font-bold text-primary mb-2">{t("labelMessage")}</label>
          <textarea name="message" id="message" rows={4} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none" placeholder={t("placeholderMessage")} required></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-2 bg-primary text-on-primary py-4 rounded-xl font-headline font-bold text-base hover:bg-secondary transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              جاري الإرسال...
            </>
          ) : (
            t("sendButton")
          )}
        </button>
      </form>
    </div>
  );
}
