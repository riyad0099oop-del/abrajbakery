import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import TiltCard from "@/components/ui/TiltCard";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { getCategoryById, categories } from "@/lib/data";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryById(resolvedParams.id);
  const t = await getTranslations("Home");

  if (!category) {
    const tc = await getTranslations("Products");
    return { title: tc("heroTitle") };
  }
  return {
    title: t(`cat_${category.id}_name` as any),
    description: t(`cat_${category.id}_desc` as any),
  };
}


export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = getCategoryById(resolvedParams.id);
  const t = await getTranslations("Home");
  const tProd = await getTranslations("Products");

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-16 px-5 md:px-16 text-center border-b border-outline-variant">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="mb-6 inline-block">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary font-body text-sm font-medium transition-colors bg-surface-container px-4 py-2 rounded-full"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                {tProd("badge")}
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                {t(`cat_${category.id}_name` as any)}
              </h1>
            </div>
            <p className="font-body text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              {t(`cat_${category.id}_desc` as any)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          staggerDelay={0.07}
        >
          {category.items.map((item) => (
            <StaggerItem key={item.name}>
              <TiltCard maxRotation={5}>
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl transition-all duration-300 group flex flex-col h-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
                  <div className="w-full h-48 relative bg-surface-container-low" style={{ transform: "translateZ(40px)" }}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow bg-surface-container-lowest" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="font-headline font-bold text-primary text-lg mb-2">{item.name}</h3>
                    <p className="font-body text-secondary text-sm font-bold mt-auto pt-4 border-t border-outline-variant/30">{item.price}</p>
                    <div style={{ transform: "translateZ(50px)" }} className="mt-3">
                      <AddToCartButton product={item} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
