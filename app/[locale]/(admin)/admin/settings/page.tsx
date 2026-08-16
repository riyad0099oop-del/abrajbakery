"use client";

import React, { useState, useEffect } from "react";
import { updateAdminCredentials, getSession } from "@/lib/actions/auth";

export default function SettingsPage() {
  const [username, setUsername] = useState("admin");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setUsername(session.username);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "كلمتا المرور غير متطابقتين!" });
      setIsSaving(false);
      return;
    }

    if (newPassword && !currentPassword) {
      setMessage({ type: "error", text: "يجب إدخال كلمة المرور الحالية!" });
      setIsSaving(false);
      return;
    }

    try {
      const res = await updateAdminCredentials(username, currentPassword, newPassword);
      if (res.success) {
        setMessage({ type: "success", text: "تم تحديث بيانات الدخول بنجاح!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: res.error || "فشل التحديث" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ في الاتصال" });
    }
    
    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-2">إعدادات الحساب</h1>
          <p className="text-on-surface-variant">تغيير اسم المستخدم وكلمة المرور الخاصة بك.</p>
        </div>
      </div>

      <div className="bg-surface rounded-[2rem] border border-outline-variant/30 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {message && (
            <div className={`p-4 rounded-xl font-bold ${message.type === "success" ? "bg-[#E6F4EA] text-[#137333]" : "bg-error-container text-error"}`}>
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">اسم المستخدم</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
            />
          </div>

          <hr className="border-outline-variant/30" />

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">كلمة المرور الحالية</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="اتركه فارغاً إذا لم ترد تغيير كلمة المرور"
              className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التعديلات"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
