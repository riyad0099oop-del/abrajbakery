"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  initialImage?: string | null;
  onImageChange: (file: File | null, previewUrl: string | null) => void;
  label?: string;
}

export default function ImageUploader({ initialImage, onImageChange, label = "صورة المنتج" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    // التحقق من أن الملف صورة
    if (!file.type.startsWith("image/")) {
      setError("الرجاء اختيار ملف صورة صالح (JPG, PNG, WEBP).");
      return;
    }

    // التحقق من الحجم (الحد الأقصى 2 ميجابايت)
    const MAX_SIZE_MB = 2;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`حجم الصورة يتجاوز الحد المسموح وهو ${MAX_SIZE_MB} ميجابايت.`);
      return;
    }

    // إنشاء رابط معاينة
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageChange(file, url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    if (preview && !preview.startsWith("http") && !preview.startsWith("/")) {
      URL.revokeObjectURL(preview); // تنظيف الذاكرة
    }
    setPreview(null);
    setError(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-on-surface">{label}</label>
      
      {error && (
        <div className="text-error text-xs font-bold bg-error-container p-2 rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </div>
      )}

      {preview ? (
        <div className="relative w-full aspect-video bg-surface-container rounded-xl overflow-hidden group border border-outline-variant/30">
          <Image 
            src={preview} 
            alt="Preview" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-surface text-primary w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="تغيير الصورة"
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-error text-on-error w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="حذف الصورة"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="w-full aspect-video bg-surface-container rounded-xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary hover:bg-primary-container/20 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">add_photo_alternate</span>
          <div className="text-center">
            <p className="font-bold text-on-surface">اضغط لرفع صورة</p>
            <p className="text-xs text-on-surface-variant mt-1">PNG, JPG, WEBP (الحد الأقصى 2MB)</p>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
    </div>
  );
}
