import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Services");
  return {
    title: t("heroTitle"),
    description: t("heroDesc"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("Services");

  const services = [
    {
      id: "weddings",
      icon: "celebration",
      title: t("service1Title"),
      desc: t("service1Desc"),
      image: "/images/service_wedding.jpg"
    },
    {
      id: "custom",
      icon: "cake",
      title: t("service2Title"),
      desc: t("service2Desc"),
      image: "/images/service_custom.jpg"
    },
    {
      id: "catering",
      icon: "storefront",
      title: t("service3Title"),
      desc: t("service3Desc"),
      image: "/images/service_catering.jpg"
    },
    {
      id: "delivery",
      icon: "local_shipping",
      title: t("service4Title"),
      desc: t("service4Desc"),
      image: "/images/service_delivery.jpg"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 px-5 md:px-16 text-center border-b border-outline-variant/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-[10%] text-primary opacity-[0.08] -rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '150px' }}>celebration</span>
        </div>
        <div className="absolute bottom-5 right-[15%] text-primary opacity-[0.08] rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '130px' }}>cake</span>
        </div>
        <div className="absolute top-1/3 right-[30%] text-primary opacity-[0.08] -rotate-45 pointer-events-none hidden md:block select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>stars</span>
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

      {/* Services List */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        {/* Important Advance Booking Notice Banner */}
        <AnimatedSection className="mb-12">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 md:p-6 flex items-center gap-4 text-amber-900 dark:text-amber-200">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base md:text-lg mb-0.5">تنبيه هام للطلبيات الخاصة والحفلات</h3>
              <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
                جميع الطلبيات الخاصة والتُرت وحفلات المناسبات تتطلب الحجز المسبق قبل يوم واحد (24 ساعة) على الأقل لضمان الجودة والدقة في التحضير.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <StaggerContainer className="flex flex-col gap-16" staggerDelay={0.1}>
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
                
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className={`relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-surface-container-lowest ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-500`}>
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>
                  <h2 className="font-headline text-3xl font-bold text-primary mb-4">
                    {service.title}
                  </h2>
                  <p className="font-body text-on-surface-variant leading-relaxed text-lg mb-8">
                    {service.desc}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-surface text-primary border border-outline-variant px-6 py-3 rounded-xl font-headline font-bold hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  >
                    {t("requestNow")}
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_back_ios</span>
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 md:px-16 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="font-body text-on-surface-variant text-lg mb-8">
              {t("ctaDesc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-secondary transition-colors shadow-lg"
            >
              {t("ctaButton")}
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
