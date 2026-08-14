"use client";

import React from "react";

const mockOffers = [
  { id: 1, title: "عرض لمة العائلة", discount: "خصم 20%", status: "نشط", badge: "الأعلى تفاعلاً" },
  { id: 2, title: "باقة الأفراح الشاملة", discount: "توصيل مجاني + خصم 15%", status: "نشط", badge: "" },
  { id: 3, title: "فرحتكم فرحتنا", discount: "ضيافة مجانية!", status: "نشط", badge: "" },
];

export default function AdminOffersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">إدارة العروض</h1>
          <p className="text-on-surface-variant">إجمالي العروض النشطة: {mockOffers.length}</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm">
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة عرض
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOffers.map((offer) => (
          <div key={offer.id} className="bg-surface rounded-[1.5rem] border border-outline-variant/30 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-br from-secondary-container to-primary-container flex items-center justify-center relative">
              <span className="material-symbols-outlined text-6xl text-secondary/40">local_offer</span>
              {offer.badge && (
                <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {offer.badge}
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-headline font-bold text-lg text-primary mb-1">{offer.title}</h3>
              <p className="text-secondary font-bold text-sm mb-3">{offer.discount}</p>
              <div className="flex items-center justify-between">
                <span className="bg-[#E6F4EA] text-[#137333] text-xs font-bold px-3 py-1 rounded-full">{offer.status}</span>
                <div className="flex gap-2">
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
