"use client";

import { useCartStore } from "@/store/cart";
import { Product } from "@/lib/data";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations("Cart");
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      aria-label={`${t("addToCart")} ${product.name}`}
      onClick={handleAdd}
      className={`mt-4 w-full text-sm font-body font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
        added 
          ? "bg-[#25D366] text-white" 
          : "bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary-fixed"
      }`}
    >
      {added ? (
        <>
          <span className="material-symbols-outlined text-base">check</span>
          {t("added")}
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
          {t("addToCart")}
        </>
      )}
    </button>
  );
}
