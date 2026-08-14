"use client";

import React, { useState } from "react";

const mockBranches = [
  {
    id: 1,
    name: "الفرع الرئيسي - العزيزية",
    address: "مكة المكرمة - حي العزيزية",
    phone: "+966 55 123 4567",
    hours: "8:00 صباحاً - 2:00 بعد منتصف الليل",
    status: "مفتوح",
  },
  {
    id: 2,
    name: "فرع الشرائع",
    address: "مكة المكرمة - حي الشرائع",
    phone: "+966 55 765 4321",
    hours: "8:00 صباحاً - 12:00 مساءً",
    status: "مفتوح",
  },
];

export default function AdminBranchesPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [branches, setBranches] = useState(mockBranches);
  const [editData, setEditData] = useState({ name: "", address: "", phone: "", hours: "", status: "" });

  const startEdit = (branch: typeof mockBranches[0]) => {
    setEditingId(branch.id);
    setEditData({ ...branch });
  };

  const saveEdit = () => {
    setBranches(branches.map(b => b.id === editingId ? { ...b, ...editData } : b));
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary mb-1">إدارة الفروع</h1>
        <p className="text-on-surface-variant">عدد الفروع: {branches.length}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-surface rounded-[1.5rem] border border-outline-variant/30 shadow-sm p-6 space-y-4">
            {editingId === branch.id ? (
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-lg text-primary mb-2">تعديل بيانات الفرع</h3>
                {[
                  { label: "اسم الفرع", key: "name" },
                  { label: "العنوان", key: "address" },
                  { label: "رقم الهاتف", key: "phone" },
                  { label: "أوقات العمل", key: "hours" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-on-surface-variant mb-1">{label}</label>
                    <input
                      value={(editData as any)[key]}
                      onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                      className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/50 rounded-xl focus:border-primary outline-none transition-all"
                    />
                  </div>
                ))}
                <div className="flex gap-3">
                  <button onClick={saveEdit} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-secondary transition-colors">
                    حفظ التعديلات
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-5 py-2.5 border border-outline-variant rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors">
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">store</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg text-primary">{branch.name}</h3>
                      <span className="bg-[#E6F4EA] text-[#137333] text-xs font-bold px-2 py-0.5 rounded-full">{branch.status}</span>
                    </div>
                  </div>
                  <button onClick={() => startEdit(branch)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: "location_on", value: branch.address },
                    { icon: "phone", value: branch.phone },
                    { icon: "schedule", value: branch.hours },
                  ].map(({ icon, value }) => (
                    <div key={icon} className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg text-secondary">{icon}</span>
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
