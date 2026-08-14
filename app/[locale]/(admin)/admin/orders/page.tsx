"use client";

import React, { useState } from "react";

const mockOrders = [
  { id: "#1042", customer: "أحمد عبدالله", phone: "0501234567", items: "بقلاوة × 2", total: "90 ر.س", date: "2026-08-14", status: "جديد" },
  { id: "#1041", customer: "سارة محمد", phone: "0557891234", items: "كيكة تخرج × 1", total: "320 ر.س", date: "2026-08-14", status: "قيد التجهيز" },
  { id: "#1040", customer: "خالد سعيد", phone: "0508765432", items: "كنافة × 1، تشيز كيك × 1", total: "100 ر.س", date: "2026-08-13", status: "مكتمل" },
  { id: "#1039", customer: "نورة علي", phone: "0551234567", items: "بوكس ضيافة × 3", total: "450 ر.س", date: "2026-08-13", status: "مكتمل" },
  { id: "#1038", customer: "محمد العمري", phone: "0509876543", items: "كرواسون × 6", total: "72 ر.س", date: "2026-08-12", status: "ملغي" },
];

const statusColors: Record<string, string> = {
  "جديد": "bg-error-container text-error",
  "قيد التجهيز": "bg-secondary-container text-secondary",
  "مكتمل": "bg-[#E6F4EA] text-[#137333]",
  "ملغي": "bg-surface-container-high text-on-surface-variant",
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("الكل");

  const filters = ["الكل", "جديد", "قيد التجهيز", "مكتمل", "ملغي"];
  const filtered = filter === "الكل" ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary mb-1">إدارة الطلبات</h1>
        <p className="text-on-surface-variant">إجمالي الطلبات: {mockOrders.length}</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
              filter === f ? "bg-primary text-white" : "bg-surface border border-outline-variant/50 text-on-surface-variant hover:bg-primary-container hover:text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface rounded-[1.5rem] border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">رقم الطلب</th>
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">العميل</th>
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">الأصناف</th>
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">المجموع</th>
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">التاريخ</th>
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">الحالة</th>
                <th className="px-5 py-4 font-bold text-on-surface-variant text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-primary">{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-on-surface">{order.customer}</p>
                    <p className="text-xs text-on-surface-variant">{order.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-on-surface-variant text-sm">{order.items}</td>
                  <td className="px-5 py-4 font-bold text-secondary">{order.total}</td>
                  <td className="px-5 py-4 text-on-surface-variant text-sm">{order.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
