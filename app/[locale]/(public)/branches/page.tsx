import { Metadata } from "next";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Branches");
  return {
    title: t("heroTitle"),
    description: t("heroDesc"),
  };
}

export default async function BranchesPage() {
  const t = await getTranslations("Branches");
  const locale = await getLocale();
  const isEn = locale === "en";

  const branches = await prisma.branch.findMany({
    where: { status: "مفتوح" },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 px-5 md:px-16 text-center border-b border-outline-variant/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-[10%] text-primary opacity-[0.08] -rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '150px' }}>location_on</span>
        </div>
        <div className="absolute bottom-10 left-[10%] text-primary opacity-[0.08] rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>map</span>
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

      {/* Branches Grid */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-12 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {branches.map((branch) => (
            <StaggerItem key={branch.id}>
              <div className="bg-surface border border-outline-variant/30 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                
                {/* Background Decor */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                    {branch.image ? (
                      <Image src={branch.image} alt={branch.name} fill className="object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl">store</span>
                    )}
                  </div>

                  <h3 className="font-headline text-2xl font-bold text-primary mb-4">{isEn && branch.nameEn ? branch.nameEn : branch.name}</h3>
                  
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-0.5">location_on</span>
                      <p className="font-body text-on-surface-variant text-sm leading-relaxed">{isEn && branch.addressEn ? branch.addressEn : (branch.address || "")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-0.5">schedule</span>
                      <p className="font-body text-on-surface-variant text-sm" dir="auto">{isEn && branch.hoursEn ? branch.hoursEn : (branch.hours || "")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-0.5">call</span>
                      <p className="font-body text-on-surface-variant text-sm font-bold" dir="ltr">{branch.phone || ""}</p>
                    </div>
                  </div>

                  <a 
                    href={`https://maps.google.com/?q=${branch.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-surface-container hover:bg-primary hover:text-white text-primary font-bold font-headline py-3 rounded-xl transition-colors duration-300 border border-outline-variant/30 hover:border-primary"
                  >
                    <span className="material-symbols-outlined text-[20px]">map</span>
                    {t("viewOnMap")}
                  </a>
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

    </div>
  );
}
