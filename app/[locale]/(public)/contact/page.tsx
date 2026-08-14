import { Metadata } from "next";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");
  return {
    title: t("heroTitle"),
    description: t("heroDesc"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 px-5 md:px-16 text-center border-b border-outline-variant/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-[15%] text-primary opacity-[0.08] -rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '150px' }}>support_agent</span>
        </div>
        <div className="absolute bottom-10 right-[10%] text-primary opacity-[0.08] rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '130px' }}>forum</span>
        </div>
        <div className="absolute top-1/3 right-[25%] text-primary opacity-[0.08] rotate-45 pointer-events-none hidden md:block select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>mail</span>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <AnimatedSection>
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-sm font-body font-bold mb-4">
              {t("badge")}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
              {t("heroTitle")}
            </h1>
            <p className="font-body text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              {t("heroDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <AnimatedSection>
              <h2 className="font-headline text-2xl font-bold text-primary mb-8">{t("infoTitle")}</h2>
            </AnimatedSection>
            
            <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.1}>
              <StaggerItem>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-secondary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary text-lg mb-1">{t("branch")}</h3>
                    <p className="font-body text-on-surface-variant text-sm">{t("branchAddress")}</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-secondary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary text-lg mb-1">{t("phone")}</h3>
                    <a href="tel:+966503890394" className="font-body text-on-surface-variant text-sm mb-1 hover:text-primary block" dir="ltr">+966 50 389 0394</a>
                    <a href="tel:+966111234567" className="font-body text-on-surface-variant text-sm hover:text-primary block" dir="ltr">+966 11 123 4567</a>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-secondary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary text-lg mb-1">{t("workHours")}</h3>
                    <p className="font-body text-on-surface-variant text-sm mb-1">{t("workHoursLine1")}</p>
                    <p className="font-body text-on-surface-variant text-sm">{t("workHoursLine2")}</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Contact Form */}
          <div>
            <AnimatedSection delay={0.2} className="bg-surface rounded-3xl p-8 border border-outline-variant/30 shadow-lg">
              {/* Notice Banner */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 flex items-start gap-3 text-amber-900 dark:text-amber-200">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                <p className="font-body text-xs leading-relaxed">
                  <strong className="font-bold">ملاحظة هامة:</strong> للطلبات الخاصة أو التجهيز للمناسبات والحفلات، يرجى تقديم طلبك قبل 24 ساعة (يوم) على الأقل من موعد الاستلام.
                </p>
              </div>

              <h2 className="font-headline text-2xl font-bold text-primary mb-6">{t("formTitle")}</h2>
              <form className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-bold text-primary mb-2">{t("labelName")}</label>
                  <input type="text" id="name" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder={t("placeholderName")} required />
                </div>
                
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="phone" className="block font-body text-sm font-bold text-primary mb-2">{t("labelPhone")}</label>
                    <input type="tel" id="phone" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="05x xxx xxxx" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-body text-sm font-bold text-primary mb-2">{t("labelMessage")}</label>
                  <textarea id="message" rows={4} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none" placeholder={t("placeholderMessage")} required></textarea>
                </div>
                
                <button type="button" className="w-full mt-2 bg-primary text-on-primary py-4 rounded-xl font-headline font-bold text-base hover:bg-secondary transition-all duration-300 shadow-md">
                  {t("sendButton")}
                </button>
              </form>
            </AnimatedSection>
          </div>
          
        </div>
      </section>
    </div>
  );
}
