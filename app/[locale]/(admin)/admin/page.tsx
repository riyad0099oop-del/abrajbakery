"use client";

import React from "react";

export default function AdminDashboard() {
  const stats = [
    { label: "إجمالي الطلبات", value: "1,284", icon: "shopping_cart", color: "text-primary", bg: "bg-primary-container" },
    { label: "المبيعات (اليوم)", value: "3,450 ر.س", icon: "payments", color: "text-secondary", bg: "bg-secondary-container" },
    { label: "المنتجات النشطة", value: "45", icon: "inventory_2", color: "text-tertiary", bg: "bg-tertiary-container" },
    { label: "العملاء الجدد", value: "128", icon: "group", color: "text-[#4A2E1B]", bg: "bg-[#E6D5C9]" },
  ];

  const recentOrders = [
    { id: "#1042", customer: "أحمد عبدالله", total: "150 ر.س", status: "جديد" },
    { id: "#1041", customer: "سارة محمد", total: "320 ر.س", status: "قيد التجهيز" },
    { id: "#1040", customer: "خالد سعيد", total: "85 ر.س", status: "مكتمل" },
    { id: "#1039", customer: "نورة علي", total: "450 ر.س", status: "مكتمل" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary mb-2">مرحباً بك في لوحة الإدارة 👋</h1>
        <p className="text-on-surface-variant">إليك نظرة سريعة على أداء متجرك اليوم.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-[1.5rem] border border-outline-variant/30 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-bold mb-1">{stat.label}</p>
              <h3 className="text-2xl font-headline font-black text-on-surface">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-surface rounded-[2rem] border border-outline-variant/30 shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-headline font-bold text-primary">أحدث الطلبات</h2>
            <button className="text-secondary font-bold hover:underline">عرض الكل</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant/30">
                  <th className="pb-4 font-bold">رقم الطلب</th>
                  <th className="pb-4 font-bold">العميل</th>
                  <th className="pb-4 font-bold">المبلغ</th>
                  <th className="pb-4 font-bold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0">
                    <td className="py-4 font-bold text-on-surface">{order.id}</td>
                    <td className="py-4 text-on-surface">{order.customer}</td>
                    <td className="py-4 text-on-surface font-bold">{order.total}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'جديد' ? 'bg-error-container text-error' :
                        order.status === 'قيد التجهيز' ? 'bg-secondary-container text-secondary' :
                        'bg-[#E6F4EA] text-[#137333]'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-surface rounded-[2rem] border border-outline-variant/30 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-headline font-bold text-primary mb-6">المنتجات الأكثر مبيعاً</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-surface-container rounded-xl"></div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">صحن بقلاوة مشكل</h4>
                  <p className="text-sm text-secondary font-bold">120 ر.س</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
