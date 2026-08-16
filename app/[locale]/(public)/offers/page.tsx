import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import TiltCard from "@/components/ui/TiltCard";
import prisma from "@/lib/prisma";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Offers");
  return {
    title: t("heroTitle"),
    description: t("heroDesc"),
  };
}

export default async function OffersPage() {
  const t = await getTranslations("Offers");
  const locale = await getLocale();
  const isEn = locale === "en";

  const offers = await prisma.offer.findMany({
    where: { status: "نشط" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 px-5 md:px-16 text-center border-b border-outline-variant/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-5 right-[15%] text-primary opacity-[0.08] rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '160px' }}>redeem</span>
        </div>
        <div className="absolute bottom-10 left-[10%] text-primary opacity-[0.08] -rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>local_offer</span>
        </div>
        <div className="absolute top-1/2 left-[25%] text-primary opacity-[0.08] rotate-45 pointer-events-none hidden md:block select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>loyalty</span>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <AnimatedSection>
            <span className="inline-block bg-error-container text-error font-body font-bold px-4 py-1.5 rounded-full text-sm mb-4 animate-pulse">
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

      {/* Offers Grid */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {offers.map((offer) => (
            <StaggerItem key={offer.id}>
              <TiltCard maxRotation={8}>
                <div className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/50 overflow-hidden shadow-lg transition-shadow duration-300 group h-full flex flex-col w-full h-full" style={{ transform: "translateZ(30px)" }}>
                  
                  {/* Offer Image & Badge */}
                  <div className="relative w-full h-56 overflow-hidden bg-surface-container">
                    {offer.image ? (
                      <Image 
                        src={offer.image} 
                        alt={offer.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                         <span className="material-symbols-outlined text-4xl">local_offer</span>
                      </div>
                    )}
                    {/* Floating Discount Badge */}
                    <div className={`absolute top-4 right-4 bg-[#FDE9D9] text-[#B35914] font-headline font-bold px-4 py-2 rounded-xl shadow-md rotate-3 group-hover:rotate-0 transition-transform duration-300 z-10`} style={{ transform: "translateZ(50px)" }}>
                      {isEn && offer.discountEn ? offer.discountEn : offer.discount}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow bg-surface-container-lowest">
                    <h3 className="font-headline font-bold text-2xl text-primary mb-3">
                      {isEn && offer.titleEn ? offer.titleEn : offer.title}
                    </h3>
                    <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                      {isEn && offer.descriptionEn ? offer.descriptionEn : (offer.description || "")}
                    </p>
                    
                    <Link
                      href="/contact"
                      className="w-full flex justify-center items-center gap-2 bg-surface text-primary border border-primary/30 px-6 py-3 rounded-xl font-headline font-bold hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                      {t("claimOffer")}
                      <span className="material-symbols-outlined text-sm rotate-180">arrow_back_ios</span>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* General 30% Promo Banner */}
      <section className="pb-24 px-5 md:px-16 max-w-[1400px] mx-auto">
        <AnimatedSection>
          <div className="bg-primary-container rounded-3xl p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-primary/10">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
               <span className="material-symbols-outlined absolute top-10 right-20 text-[200px]">redeem</span>
            </div>
            
            <div className="relative z-10 max-w-md text-right ltr:text-left mb-10 md:mb-0">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-primary-container mb-3">
                {t("storeTitle")}
              </h2>
              <p className="font-body text-on-surface-variant text-base mb-8">
                {t("storeDesc")}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-headline font-bold text-base hover:bg-secondary transition-all duration-300 shadow-md"
              >
                {t("browseProducts")}
              </Link>
            </div>
            
            <div className="relative z-10 flex items-center gap-8">
              <div className="text-center">
                <p className="font-headline text-6xl md:text-8xl font-black text-secondary">30%</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
      
    </div>
  );
}
