"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";

const mockProducts = [
  { id: 1, name: "صحن بقلاوة مشكل", category: "حلويات شرقية", price: 45, stock: 20, status: "متاح" },
  { id: 2, name: "كنافة بالجبن", category: "حلويات شرقية", price: 35, stock: 8, status: "متاح" },
  { id: 3, name: "تشيز كيك عسل", category: "حلويات غربية", price: 65, stock: 5, status: "قليل" },
  { id: 4, name: "كرواسون الزبدة", category: "مخبوزات", price: 12, stock: 0, status: "نفد" },
  { id: 5, name: "تارت الفراولة", category: "حلويات غربية", price: 55, stock: 15, status: "متاح" },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter(p =>
    p.name.includes(search) || p.category.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">إدارة المنتجات</h1>
          <p className="text-on-surface-variant">إجمالي المنتجات: {mockProducts.length}</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm">
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة منتج
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-4 text-on-surface-variant">search</span>
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-surface border border-outline-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-surface rounded-[1.5rem] border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">المنتج</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">التصنيف</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">السعر</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">المخزون</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">الحالة</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-container rounded-lg flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-xl">cake</span>
                      </div>
                      <span className="font-bold text-on-surface">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-secondary">{product.price} ر.س</td>
                  <td className="px-6 py-4 text-on-surface">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.status === "متاح" ? "bg-[#E6F4EA] text-[#137333]" :
                      product.status === "قليل" ? "bg-secondary-container text-secondary" :
                      "bg-error-container text-error"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
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
