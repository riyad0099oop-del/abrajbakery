import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { categories } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { LocalBusinessSchema } from "@/components/seo/SchemaOrg";

export const metadata: Metadata = {
  title: "أبراج للحلويات - أجود الحلويات الشرقية والغربية بمكة المكرمة",
  description: "أبراج للحلويات مكة — وجهتك الأولى لأشهى الحلويات الشرقية والغربية والمخبوزات الطازجة بأفضل الأسعار. تشكيلة واسعة من الكنافة، بقلاوة، بسبوسة، كيك مخصص، وبوفيهات المناسبات. توصيل سريع وخدمة احترافية.",
  keywords: [
    "حلويات مكة", "حلويات شرقية مكة",
    "كنافة مكة", "بقلاوة مكة",
    "كيك مخصص مكة", "بسبوسة",
    "مخبوزات مكة", "بوفيه حلويات",
    "حلويات العزيزية", "حلويات الشرائع",
    "أبراج للحلويات", "حلويات غربية مكة",
    "توصيل حلويات مكة", "طلب حلويات مكة",
    "حلويات مناسبات", "sweets makkah",
    "arabic sweets mecca", "kunafa makkah",
  ],
  authors: [{ name: "أبراج للحلويات" }],
  creator: "أبراج للحلويات",
  publisher: "أبراج للحلويات",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://abraj-sweets.com/ar",
    siteName: "أبراج للحويات",
    title: "أبراج للحلويات - أجود الحلويات بمكة المكرمة",
    description: "تشكيلة واسعة من الحلويات الشرقية والغربية والمخبوزات بأفضل الأسعار.",
    images: [
      {
        url: "https://abraj-sweets.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "أبراج للحلويات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أبراج للحلويات - أجود الحلويات بمكة",
    description: "تشكيلة واسعة من الحلويات الشرقية والغربية والمخبوزات.",
  },
  alternates: {
    canonical: "https://abraj-sweets.com/ar",
    languages: {
      "ar": "https://abraj-sweets.com/ar",
      "en": "https://abraj-sweets.com/en",
    },
  },
};

export default async function HomePage() {
  const t = await getTranslations("Home");

  const features = [
    { icon: "local_shipping", title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: "workspace_premium", title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: "cake", title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: "support_agent", title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  return (
    <div className="bg-background">
      <LocalBusinessSchema />
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-[#FDFBF8] pt-20">
        
        {/* Full Background Image (Cake on the right) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-cake-new.jpg"
            alt="أبراج للحلويات"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability on smaller screens */}
          <div className="absolute inset-0 bg-gradient-to-l rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#FDFBF8]/95 via-[#FDFBF8]/60 to-transparent lg:hidden"></div>
        </div>

        {/* Floating Arabic Logo in the Left Corner */}
        <div className="absolute top-32 left-4 md:top-28 md:left-12 ltr:right-12 ltr:left-auto w-20 h-20 md:w-40 md:h-40 opacity-90 pointer-events-none select-none z-10">
          <Image 
            src="/images/1786624283616.png" 
            alt="أبراج للحلويات" 
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-12 py-10 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            
            {/* Empty space on the right (Cake side) */}
            <div className="hidden lg:block relative z-10 h-full w-full order-last lg:order-first ltr:order-last"></div>

            {/* Text Content */}
            <div className="max-w-xl text-right ltr:text-left z-10 lg:pl-10 ltr:lg:pl-0 ltr:lg:pr-10 order-first lg:order-last ltr:order-first relative mt-10 lg:mt-0">
              
              {/* Decorative Watermark Leaves */}
              <div className="absolute -top-10 -right-10 ltr:right-auto ltr:-left-10 text-primary opacity-5 rotate-[20deg] pointer-events-none select-none">
                <span className="material-symbols-outlined" style={{ fontSize: '180px' }}>eco</span>
              </div>
              
              <AnimatedSection>
                <p className="text-secondary font-body font-bold text-xl mb-3 drop-shadow-sm">{t("heroSubtitle")}</p>
                <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary leading-[1.3] mb-6 drop-shadow-sm" dangerouslySetInnerHTML={{ __html: t("heroTitle") }}></h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="font-body text-base md:text-lg text-primary/80 font-medium leading-relaxed mb-10 max-w-md drop-shadow-sm">
                  {t("heroDesc")}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="flex flex-wrap justify-end ltr:justify-start gap-4">
                  <Link
                    href="#categories"
                    className="inline-flex items-center justify-center gap-3 bg-secondary text-white px-8 py-3.5 rounded-full font-headline font-bold text-lg hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                  >
                    {t("shopNow")}
                    <span className="bg-white text-secondary rounded-full w-8 h-8 flex items-center justify-center transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform">
                      <span className="material-symbols-outlined text-[16px] rtl:rotate-180">arrow_forward_ios</span>
                    </span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="relative z-20 -mt-12 px-5 md:px-12 max-w-[1400px] mx-auto">
        <div className="bg-surface rounded-3xl border border-outline-variant/30 py-10 px-6">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse ltr:sm:divide-x-0 divide-outline-variant/40" staggerDelay={0.1}>
            {features.map((f, i) => (
              <StaggerItem key={f.title}>
                <div className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 text-[#9b6a43]">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 200" }}>{f.icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-primary text-lg mb-1">{f.title}</h3>
                  <p className="font-body text-xs text-on-surface-variant/80 max-w-[180px] leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 px-5 md:px-12 max-w-[1400px] mx-auto">
        <AnimatedSection className="flex items-center justify-center mb-24">
          <div className="h-px bg-outline-variant/50 w-full max-w-[50px] md:max-w-[150px]"></div>
          <span className="material-symbols-outlined text-[#9b6a43] mx-1 md:mx-2 rotate-180 ltr:rotate-0" style={{ fontSize: '16px' }}>double_arrow</span>
          <h2 className="font-headline text-xl md:text-2xl font-bold text-primary mx-2 md:mx-4 text-center">{t("shopByCategory")}</h2>
          <span className="material-symbols-outlined text-[#9b6a43] mx-1 md:mx-2 ltr:rotate-180" style={{ fontSize: '16px' }}>double_arrow</span>
          <div className="h-px bg-outline-variant/50 w-full max-w-[50px] md:max-w-[150px]"></div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-24 mt-10" staggerDelay={0.1}>
          {categories.map((cat) => (
              <StaggerItem key={cat.id}>
                <Link
                  href={`/products/${cat.id}`}
                  className="block bg-white rounded-2xl border border-outline-variant/30 p-4 pt-16 pb-6 text-center hover:shadow-xl transition-all duration-300 group shadow-sm relative h-full flex flex-col items-center w-full max-w-xs mx-auto"
                >
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-surface-container-low group-hover:-translate-y-2 transition-transform duration-300">
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      sizes="112px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center mb-3 text-[#9b6a43]">
                     <span className="material-symbols-outlined text-sm">cake</span>
                  </div>
                  <h3 className="font-headline font-bold text-lg text-primary mb-1">{t(`cat_${cat.id}_name` as any)}</h3>
                  <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-4">{t(`cat_${cat.id}_desc` as any)}</p>
                  
                  {/* Interactive Button */}
                  <div className="mt-auto pt-4 flex justify-center w-full">
                     <div className="w-10 h-10 rounded-full bg-surface-variant/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px] rtl:rotate-180 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform">arrow_forward</span>
                     </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
        </StaggerContainer>
      </section>

      {/* Promo Banner */}
      <section className="pb-24 px-5 md:px-12 max-w-[1400px] mx-auto">
        <AnimatedSection>
          <div className="bg-[#FAF6F0] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between border border-[#EBE3D5] relative overflow-hidden">
            
            {/* Decorative background shape */}
            <div className="absolute top-0 right-0 ltr:right-auto ltr:left-0 w-64 h-64 bg-[#F3EAD8] rounded-bl-full ltr:rounded-bl-none ltr:rounded-br-full opacity-50 pointer-events-none"></div>

            <div className="relative z-10 max-w-sm text-right ltr:text-left mb-10 md:mb-0 order-last md:order-first ltr:order-first w-full md:w-1/3">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4 leading-snug" dangerouslySetInnerHTML={{ __html: t("promoTitle") }}></h2>
              <p className="font-body text-primary/80 text-sm mb-8 leading-relaxed">
                {t("promoDesc")}
              </p>
              <Link
                href="/offers"
                className="inline-flex items-center justify-center gap-3 bg-secondary text-white px-8 py-3.5 rounded-full font-headline font-bold text-lg hover:bg-primary transition-all duration-300 shadow-md hover:-translate-y-1 group"
              >
                {t("discoverOffers")}
                <span className="bg-white text-secondary rounded-full w-8 h-8 flex items-center justify-center transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform">
                  <span className="material-symbols-outlined text-[16px] rtl:rotate-180">arrow_forward_ios</span>
                </span>
              </Link>
            </div>
            
            <div className="relative z-10 flex items-center justify-center flex-1 order-2 mb-10 md:mb-0">
               <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                 <div className="flex flex-col items-center justify-center text-center sm:text-right ltr:sm:text-left">
                    <p className="font-headline text-primary text-lg md:text-xl font-bold mb-1">{t("discounts")}</p>
                    <p className="font-headline text-primary text-lg md:text-xl font-bold">{t("upTo")}</p>
                 </div>
                 <span className="font-headline font-black text-[100px] md:text-[140px] text-[#D4AF37] leading-none tracking-tighter drop-shadow-lg flex items-center" style={{ textShadow: "0px 10px 20px rgba(212,175,55,0.3)" }}>
                   30<span className="text-5xl md:text-8xl mx-1">%</span>
                 </span>
               </div>
            </div>

            <div className="relative z-10 w-full md:w-1/4 flex justify-center md:justify-end ltr:md:justify-start order-first md:order-last ltr:order-last mb-8 md:mb-0">
               <div className="w-24 h-24 md:w-48 md:h-48 relative">
                 <span className="material-symbols-outlined text-[#9b6a43]/20 absolute inset-0 text-[100px] md:text-[180px] md:-right-10 ltr:md:-right-auto ltr:md:-left-10 md:-top-10 rotate-12">redeem</span>
               </div>
            </div>

          </div>
        </AnimatedSection>
      </section>
      {/* Bottom Features */}
      <section className="py-12 border-t border-outline-variant/30 bg-[#FDFBF8]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#9b6a43] mb-3" style={{ fontVariationSettings: "'wght' 200" }}>eco</span>
              <h4 className="font-headline font-bold text-primary mb-1">{t("bottom1")}</h4>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#9b6a43] mb-3" style={{ fontVariationSettings: "'wght' 200" }}>cookie</span>
              <h4 className="font-headline font-bold text-primary mb-1">{t("bottom2")}</h4>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#9b6a43] mb-3" style={{ fontVariationSettings: "'wght' 200" }}>favorite</span>
              <h4 className="font-headline font-bold text-primary mb-1">{t("bottom3")}</h4>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#9b6a43] mb-3" style={{ fontVariationSettings: "'wght' 200" }}>celebration</span>
              <h4 className="font-headline font-bold text-primary mb-1">{t("bottom4")}</h4>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
