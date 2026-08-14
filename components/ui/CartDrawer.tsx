"use client";

import { useCartStore } from "@/store/cart";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CartDrawer() {
  const t = useTranslations("Cart");
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, getTotalItems, clearCart } = useCartStore();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Format the WhatsApp message
    let message = `${t("whatsappGreeting")}%0A%0A`;
    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.product.name}%0A`;
    });
    message += `%0A${t("whatsappThankYou")}`;
    
    // Clear cart and redirect
    clearCart();
    closeCart();
    window.open(`https://wa.me/9660503890394?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-background/80 backdrop-blur-sm transition-opacity">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={closeCart}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-surface-container-lowest shadow-2xl flex flex-col border-l border-outline-variant animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_cart
            </span>
            <h2 className="font-headline text-xl font-bold text-primary">{t("title")}</h2>
            <span className="bg-secondary text-on-secondary-fixed text-xs font-bold px-2 py-0.5 rounded-full">
              {getTotalItems()}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant/60 gap-4">
              <span className="material-symbols-outlined text-6xl opacity-50">remove_shopping_cart</span>
              <p className="font-body text-lg">{t("empty")}</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.name} className="flex gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest relative group">
                <button
                  onClick={() => removeItem(item.product.name)}
                  className="absolute top-2 left-2 p-1 text-error/60 hover:text-error transition-colors rounded-md hover:bg-error-container"
                  aria-label="Delete"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-grow justify-between py-1">
                  <div>
                    <h3 className="font-headline font-bold text-primary text-sm line-clamp-1 pr-6">{item.product.name}</h3>
                    <p className="font-body text-xs text-secondary font-bold mt-1">{item.product.price}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.name, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="font-body font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.name, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-outline-variant bg-surface-container-low flex flex-col gap-3">
            {/* Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2 text-amber-900 dark:text-amber-200 text-xs font-body">
              <span className="material-symbols-outlined text-amber-600 text-base shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              <span>ملاحظة: الطلبيات الخاصة والحفلات تتطلب الحجز قبل 24 ساعة على الأقل.</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl font-headline font-bold hover:bg-[#128C7E] transition-colors duration-200 shadow-lg"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              {t("checkout")}
            </button>
            <p className="text-center text-xs text-on-surface-variant font-body">
              {t("whatsappNote")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
