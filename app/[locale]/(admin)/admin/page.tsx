"use client";

import React from "react";
import { Link } from "@/i18n/routing";

export default function AdminDashboard() {
  const stats = [
    { label: "الأقسام", value: "8", icon: "category", color: "text-primary", bg: "bg-primary-container", href: "/admin/categories" },
    { label: "المنتجات", value: "45", icon: "inventory_2", color: "text-secondary", bg: "bg-secondary-container", href: "/admin/products" },
    { label: "الخدمات", value: "3", icon: "room_service", color: "text-tertiary", bg: "bg-tertiary-container", href: "/admin/services" },
    { label: "العروض", value: "2", icon: "local_offer", color: "text-[#4A2E1B]", bg: "bg-[#E6D5C9]", href: "/admin/offers" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary mb-2">مرحباً بك في لوحة الإدارة 👋</h1>
        <p className="text-on-surface-variant">إليك نظرة سريعة على محتوى موقعك.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link href={stat.href} key={i} className="bg-surface p-6 rounded-[1.5rem] border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:border-primary/50 transition-colors group">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-bold mb-1">{stat.label}</p>
              <h3 className="text-2xl font-headline font-black text-on-surface">{stat.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-primary-container/30 rounded-[2rem] p-8 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-2">إدارة الفروع</h2>
          <p className="text-on-surface-variant">تأكد من تحديث أوقات العمل وأرقام التواصل لفروعك لضمان تجربة عملاء ممتازة.</p>
        </div>
        <Link href="/admin/branches" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors whitespace-nowrap">
          تعديل الفروع
        </Link>
      </div>
    </div>
  );
}
