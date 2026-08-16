"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/admin/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";
import { getServices, addService, updateService, deleteService } from "@/lib/actions/service";
import { uploadImage } from "@/lib/actions/upload";

interface Service {
  id: number;
  title: string;
  titleEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  icon: string | null;
  status: string;
  image: string | null;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState("نشط");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getServices();
    if (res.success && res.data) {
      setServices(res.data as Service[]);
    }
    setIsLoading(false);
  };

  const filtered = services.filter(s =>
    s.title.includes(search) || (s.description || "").includes(search)
  );

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setTitle(service.title);
      setTitleEn(service.titleEn || "");
      setDescription(service.description || "");
      setDescriptionEn(service.descriptionEn || "");
      setIcon(service.icon || "");
      setStatus(service.status);
      setImage(service.image);
    } else {
      setEditingService(null);
      setTitle("");
      setTitleEn("");
      setDescription("");
      setDescriptionEn("");
      setIcon("");
      setStatus("نشط");
      setImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingService(null);
      setTitle("");
      setTitleEn("");
      setDescription("");
      setDescriptionEn("");
      setIcon("");
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

    if (editingService) {
      await updateService(editingService.id, { 
        title, titleEn,
        description, descriptionEn,
        icon,
        status, 
        image: imageUrl || undefined 
      });
    } else {
      await addService({ 
        title, titleEn,
        description, descriptionEn,
        icon,
        status, 
        image: imageUrl || undefined 
      });
    }

    await fetchData();
    setIsSaving(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      const res = await deleteService(id);
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
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">الخدمات الإضافية</h1>
          <p className="text-on-surface-variant">التحكم بالخدمات المقدمة مثل التوصيل والتغليف وغيرها (إجمالي: {services.length})</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة خدمة جديدة
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-4 text-on-surface-variant">search</span>
        <input
          type="text"
          placeholder="ابحث عن خدمة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-surface border border-outline-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-on-surface-variant">
            لا توجد خدمات حالياً.
          </div>
        ) : (
          filtered.map((service) => (
            <div key={service.id} className="bg-surface border border-outline-variant/30 rounded-[1.5rem] p-6 flex flex-col justify-between hover:border-primary/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-primary-container text-primary rounded-xl flex items-center justify-center overflow-hidden relative">
                  {service.image ? (
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl">{service.icon || 'home_repair_service'}</span>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(service)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1 flex items-center gap-2">
                  {service.title}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    service.status === "نشط" ? "bg-[#E6F4EA] text-[#137333]" : "bg-error-container text-error"
                  }`}>
                    {service.status}
                  </span>
                </h3>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUploader 
            label="صورة توضيحية للخدمة (اختياري)"
            initialImage={image}
            onImageChange={(file, url) => {
              setImageFile(file);
              if (!file && url) setImage(url);
              if (file) setImage(null);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم الخدمة (عربي)</label>
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
              <label className="block text-sm font-bold text-on-surface mb-2">اسم الخدمة (إنجليزي)</label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
          </div>
            
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم الأيقونة (Google Material Symbols)</label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="مثال: local_shipping"
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">وصف الخدمة (عربي)</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface resize-none h-24 text-right"
                dir="rtl"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">وصف الخدمة (إنجليزي)</label>
              <textarea
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface resize-none h-24 text-left"
                dir="ltr"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">حالة الخدمة</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface appearance-none"
            >
              <option value="نشط">نشطة (تظهر للزوار)</option>
              <option value="مخفي">مخفية (لا تظهر للزوار)</option>
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
