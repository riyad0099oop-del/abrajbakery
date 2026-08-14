import { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return {
    title: t("heroTitle"),
    description: t("heroDesc"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 px-5 md:px-16 text-center border-b border-outline-variant/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-[10%] text-primary opacity-[0.08] -rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '150px' }}>bakery_dining</span>
        </div>
        <div className="absolute bottom-10 left-[10%] text-primary opacity-[0.08] rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>eco</span>
        </div>
        <div className="absolute top-1/2 left-[25%] text-primary opacity-[0.08] -rotate-45 pointer-events-none hidden md:block select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>auto_awesome</span>
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

      {/* Story Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-surface-container-lowest shadow-2xl rotate-[-2deg]">
              <Image 
                src="/images/bakery-hero.jpg" 
                alt={t("storyTitle")}
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white z-10">
                <span className="material-symbols-outlined text-4xl mb-2">auto_awesome</span>
                <p className="font-headline font-bold text-2xl">{t("imageCaption")}</p>
              </div>
            </div>
          </AnimatedSection>

          <div>
            <AnimatedSection delay={0.2}>
              <h2 className="font-headline text-3xl font-bold text-primary mb-6">{t("storyTitle")}</h2>
              <div className="font-body text-on-surface-variant leading-relaxed space-y-4">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-2 gap-6 mt-10" staggerDelay={0.1}>
              <StaggerItem>
                <div className="bg-surface-container p-5 rounded-2xl border border-outline-variant/30 text-center">
                  <h3 className="font-headline font-black text-3xl text-secondary mb-1">{t("stat1Value")}</h3>
                  <p className="font-body text-sm font-bold text-primary">{t("stat1Label")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-surface-container p-5 rounded-2xl border border-outline-variant/30 text-center">
                  <h3 className="font-headline font-black text-3xl text-secondary mb-1">{t("stat2Value")}</h3>
                  <p className="font-body text-sm font-bold text-primary">{t("stat2Label")}</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

    </div>
  );
}
