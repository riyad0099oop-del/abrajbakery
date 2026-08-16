"use client";

import React, { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { login } from "@/lib/actions/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(username, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "فشل تسجيل الدخول");
        setLoading(false);
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال بالخادم");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-4 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-secondary-container rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="bg-surface w-full max-w-md p-8 md:p-10 rounded-[2rem] shadow-xl border border-outline-variant/30 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-container text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-2">تسجيل الدخول</h1>
          <p className="text-on-surface-variant">لوحة تحكم أبراج للحلويات</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-error-container text-error rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface">اسم المستخدم</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface"
              placeholder="admin"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface">كلمة المرور</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-headline font-bold text-lg hover:bg-on-primary-container transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              "الدخول للوحة التحكم"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
