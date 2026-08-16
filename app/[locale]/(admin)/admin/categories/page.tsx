"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/admin/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/actions/category";
import { uploadImage } from "@/lib/actions/upload";

// Define the shape coming from DB
interface Category {
  id: number;
  name: string;
  nameEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  tag: string | null;
  tagEn: string | null;
  image: string | null;
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const res = await getCategories();
    if (res.success && res.data) {
      setCategories(res.data as Category[]);
    }
    setIsLoading(false);
  };

  const filtered = categories.filter(c => c.name.includes(search));

  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingCat(cat);
      setName(cat.name);
      setNameEn(cat.nameEn || "");
      setImage(cat.image);
    } else {
      setEditingCat(null);
      setName("");
      setNameEn("");
      setImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingCat(null);
      setName("");
      setNameEn("");
      setImage(null);
      setImageFile(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    let imageUrl = image;
    
    // Upload image if a new file was selected
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await uploadImage(formData);
      if (uploadRes.success && uploadRes.url) {
        imageUrl = uploadRes.url;
      } else {
        alert("فشل في رفع الصورة: " + uploadRes.error);
        setIsSaving(false);
        return;
      }
    }

    if (editingCat) {
      // Update
      await updateCategory(editingCat.id, { name, nameEn, image: imageUrl || undefined });
    } else {
      // Add
      await addCategory({ name, nameEn, image: imageUrl || undefined });
    }

    await fetchCategories();
    setIsSaving(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      const res = await deleteCategory(id);
      if (res.success) {
        await fetchCategories();
      } else {
        alert(res.error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">أقسام المنتجات</h1>
          <p className="text-on-surface-variant">تنظيم منتجاتك في أقسام لتسهيل تصفح العملاء</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة قسم جديد
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-4 text-on-surface-variant">search</span>
        <input
          type="text"
          placeholder="ابحث عن قسم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-surface border border-outline-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12">
           <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((cat) => (
            <div key={cat.id} className="bg-surface border border-outline-variant/30 rounded-[1.5rem] p-6 flex flex-col justify-between hover:border-primary/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-primary-container text-primary rounded-xl flex items-center justify-center overflow-hidden relative">
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl">category</span>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(cat)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">{cat.name}</h3>
                <p className="text-on-surface-variant text-sm font-medium">{cat._count?.products || 0} منتجات مرتبطة</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-on-surface-variant">
              لا توجد أقسام حالياً.
            </div>
          )}
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCat ? "تعديل القسم" : "إضافة قسم جديد"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUploader 
            label="صورة القسم"
            initialImage={image}
            onImageChange={(file, url) => {
              setImageFile(file);
              if (!file && url) setImage(url); // Initial or reset
              if (file) setImage(null); // Will be uploaded
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم القسم (عربي)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                placeholder="مثال: حلويات شرقية"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم القسم (إنجليزي)</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                placeholder="Example: Eastern Sweets"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary text-on-primary px-8 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : null}
              {isSaving ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
