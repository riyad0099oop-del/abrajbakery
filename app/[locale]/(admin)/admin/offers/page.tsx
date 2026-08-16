"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/admin/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";
import { getOffers, addOffer, updateOffer, deleteOffer } from "@/lib/actions/offer";
import { uploadImage } from "@/lib/actions/upload";

interface Offer {
  id: number;
  title: string;
  titleEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  discount: string;
  discountEn: string | null;
  badge: string | null;
  status: string;
  image: string | null;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  // Form State
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountEn, setDiscountEn] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeEn, setBadgeEn] = useState("");
  const [status, setStatus] = useState("نشط");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getOffers();
    if (res.success && res.data) {
      setOffers(res.data as Offer[]);
    }
    setIsLoading(false);
  };

  const filtered = offers.filter(o =>
    o.title.includes(search) || (o.description || "").includes(search)
  );

  const handleOpenModal = (offer?: Offer) => {
    if (offer) {
      setEditingOffer(offer);
      setTitle(offer.title);
      setTitleEn(offer.titleEn || "");
      setDescription(offer.description || "");
      setDescriptionEn(offer.descriptionEn || "");
      setDiscount(offer.discount);
      setDiscountEn(offer.discountEn || "");
      setBadge(offer.badge || "");
      setBadgeEn(offer.badgeEn || "");
      setStatus(offer.status);
      setImage(offer.image);
    } else {
      setEditingOffer(null);
      setTitle("");
      setTitleEn("");
      setDescription("");
      setDescriptionEn("");
      setDiscount("");
      setDiscountEn("");
      setBadge("");
      setBadgeEn("");
      setStatus("نشط");
      setImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingOffer(null);
      setTitle("");
      setTitleEn("");
      setDescription("");
      setDescriptionEn("");
      setDiscount("");
      setDiscountEn("");
      setBadge("");
      setBadgeEn("");
      setImage(null);
      setImageFile(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    if (editingOffer) {
      await updateOffer(editingOffer.id, { 
        title, titleEn,
        description, descriptionEn,
        discount, discountEn,
        badge, badgeEn,
        status, 
        image: imageUrl || undefined 
      });
    } else {
      await addOffer({ 
        title, titleEn,
        description, descriptionEn,
        discount, discountEn,
        badge, badgeEn,
        status, 
        image: imageUrl || undefined 
      });
    }

    await fetchData();
    setIsSaving(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا العرض؟")) {
      const res = await deleteOffer(id);
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
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">إدارة العروض</h1>
          <p className="text-on-surface-variant">التحكم بالعروض الخاصة والخصومات (إجمالي: {offers.length})</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة عرض جديد
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-4 text-on-surface-variant">search</span>
        <input
          type="text"
          placeholder="ابحث عن عرض..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-surface border border-outline-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-surface rounded-[1.5rem] border border-outline-variant/30 shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[800px] text-right">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">صورة وعنوان العرض</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">الخصم / الميزة</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">الشارة</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">حالة العرض</th>
                <th className="px-6 py-4 font-bold text-on-surface-variant text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                    لا توجد عروض حالياً.
                  </td>
                </tr>
              ) : (
                filtered.map((offer) => (
                  <tr key={offer.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-secondary relative overflow-hidden shrink-0">
                          {offer.image ? (
                            <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-2xl">local_offer</span>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-on-surface text-lg block">{offer.title}</span>
                          <span className="text-sm text-on-surface-variant truncate max-w-[200px] block">{offer.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant font-bold text-primary">{offer.discount}</td>
                    <td className="px-6 py-4">
                      {offer.badge ? (
                         <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">
                           {offer.badge}
                         </span>
                      ) : (
                         <span className="text-on-surface-variant text-sm">لا يوجد</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                        offer.status === "نشط" ? "bg-[#E6F4EA] text-[#137333]" : "bg-error-container text-error"
                      }`}>
                        {offer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(offer)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button onClick={() => handleDelete(offer.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-colors">
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
        title={editingOffer ? "تعديل العرض" : "إضافة عرض جديد"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUploader 
            label="صورة العرض"
            initialImage={image}
            onImageChange={(file, url) => {
              setImageFile(file);
              if (!file && url) setImage(url);
              if (file) setImage(null);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">عنوان العرض (عربي)</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">عنوان العرض (إنجليزي)</label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">قيمة الخصم أو الميزة (عربي - مثال: خصم 20%)</label>
              <input
                type="text"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">قيمة الخصم (إنجليزي - مثال: 20% Off)</label>
              <input
                type="text"
                value={discountEn}
                onChange={(e) => setDiscountEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">وصف العرض (عربي - اختياري)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface resize-none h-24 text-right"
                dir="rtl"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">وصف العرض (إنجليزي - اختياري)</label>
              <textarea
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface resize-none h-24 text-left"
                dir="ltr"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">نص الشارة (عربي - اختياري)</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">نص الشارة (إنجليزي - اختياري)</label>
              <input
                type="text"
                value={badgeEn}
                onChange={(e) => setBadgeEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">حالة العرض</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface appearance-none"
              >
                <option value="نشط">نشط (يظهر للزوار)</option>
                <option value="مخفي">مخفي (لا يظهر للزوار)</option>
              </select>
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
