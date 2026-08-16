import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import prisma from "@/lib/prisma";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Products");
  return {
    title: t("heroTitle"),
    description: t("heroDesc"),
  };
}

export default async function ProductsIndexPage() {
  const t = await getTranslations("Products");
  const commonT = await getTranslations("Common");
  const tHome = await getTranslations("Home");
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary-container via-secondary-fixed to-primary-fixed py-20 px-5 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {["🥐", "🍰", "🧆", "🍫", "🥧"].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-8xl select-none"
              style={{ top: `${10 + i * 18}%`, left: `${5 + i * 18}%`, rotate: `${-15 + i * 8}deg` }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <AnimatedSection>
            <span className="inline-block bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-body font-medium mb-4">
              {t("badge")}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{t("heroTitle")}</h1>
            <p className="font-body text-on-surface-variant leading-relaxed">
              {t("heroDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {(await prisma.category.findMany({ orderBy: { createdAt: "asc" } })).map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/products/${cat.id}`}
                className="block bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 text-center hover:border-secondary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col items-center"
              >
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden relative bg-surface-container">
                  {cat.image ? (
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                       <span className="material-symbols-outlined text-4xl text-on-surface-variant">category</span>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <span className="bg-secondary-container text-on-secondary-container text-xs font-body font-medium px-3 py-1 rounded-full">
                    {isEn && cat.tagEn ? cat.tagEn : (cat.tag || commonT("category").replace(":", ""))}
                  </span>
                </div>
                <h2 className="font-headline font-bold text-2xl text-primary mb-3 mt-2">
                  {isEn && cat.nameEn ? cat.nameEn : cat.name}
                </h2>
                <p className="font-body text-sm text-on-surface-variant flex-grow leading-relaxed">
                  {isEn && cat.descriptionEn ? cat.descriptionEn : (cat.description || commonT("browseProductsDesc"))}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-secondary font-body text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:translate-x-[-4px] ltr:group-hover:translate-x-[4px] transition-all duration-300">
                  <span>{t("browseProducts")}</span>
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
      
      {/* CTA */}
      <section className="px-5 md:px-16 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection>
            <div className="bg-primary text-on-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-2">{t("notFound")}</h3>
                <p className="font-body text-on-primary/80 text-sm">{t("notFoundDesc")}</p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-secondary text-on-secondary-fixed px-8 py-4 rounded-xl font-headline font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-200"
              >
                {t("customOrder")}
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
