"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/admin/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/actions/product";
import { getCategories } from "@/lib/actions/category";
import { uploadImage } from "@/lib/actions/upload";

interface Product {
  id: number;
  name: string;
  nameEn: string | null;
  categoryId: number;
  category?: { name: string };
  status: string;
  image: string | null;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [status, setStatus] = useState("نشط");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
    
    if (catRes.success && catRes.data) {
      setCategories(catRes.data as Category[]);
      if (catRes.data.length > 0) {
        setCategoryId((catRes.data[0] as Category).id);
      }
    }
    
    if (prodRes.success && prodRes.data) {
      setProducts(prodRes.data as Product[]);
    }
    setIsLoading(false);
  };

  const filtered = products.filter(p =>
    p.name.includes(search) || (p.category?.name || "").includes(search)
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name);
      setNameEn(product.nameEn || "");
      setCategoryId(product.categoryId);
      setStatus(product.status);
      setImage(product.image);
    } else {
      setEditingProduct(null);
      setName("");
      setNameEn("");
      if (categories.length > 0) setCategoryId(categories[0].id);
      setStatus("نشط");
      setImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingProduct(null);
      setName("");
      setNameEn("");
      setImage(null);
      setImageFile(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categories.length === 0) {
      alert("يجب إضافة قسم واحد على الأقل قبل إضافة المنتجات");
      return;
    }
    
    setIsSaving(true);
    let imageUrl = image;
    
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

    if (editingProduct) {
      await updateProduct(editingProduct.id, { 
        name, 
        nameEn,
        categoryId: Number(categoryId), 
        status, 
        image: imageUrl || undefined 
      });
    } else {
      await addProduct({ 
        name, 
        nameEn,
        categoryId: Number(categoryId), 
        status, 
        image: imageUrl || undefined 
      });
    }

    await fetchData();
    setIsSaving(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      const res = await deleteProduct(id);
      if (res.success) {
        await fetchData();
      } else {
        alert(res.error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">إدارة المنتجات</h1>
          <p className="text-on-surface-variant">التحكم بالمنتجات المعروضة بالموقع (إجمالي: {products.length})</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة منتج جديد
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-4 text-on-surface-variant">search</span>
        <input
          type="text"
          placeholder="ابحث عن منتج أو قسم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-surface border border-outline-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-surface rounded-[1.5rem] border border-outline-variant/30 shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[700px] text-right">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">صورة واسم المنتج</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">القسم</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">حالة العرض</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                    لا توجد منتجات حالياً.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-secondary relative overflow-hidden shrink-0">
                          {product.image ? (
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-2xl">image</span>
                          )}
                        </div>
                        <span className="font-bold text-on-surface text-lg">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant font-medium">{product.category?.name || "غير محدد"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                        product.status === "نشط" || product.status === "معروض" ? "bg-[#E6F4EA] text-[#137333]" : "bg-error-container text-error"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUploader 
            label="صورة المنتج"
            initialImage={image}
            onImageChange={(file, url) => {
              setImageFile(file);
              if (!file && url) setImage(url);
              if (file) setImage(null);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم المنتج (عربي)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم المنتج (إنجليزي)</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-on-surface mb-2">القسم</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">حالة العرض</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface appearance-none"
            >
              <option value="نشط">معروض (يظهر للزوار)</option>
              <option value="مخفي">مخفي (لا يظهر للزوار)</option>
            </select>
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
