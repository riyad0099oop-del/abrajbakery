"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/admin/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";
import { getBranches, addBranch, updateBranch, deleteBranch } from "@/lib/actions/branch";
import { uploadImage } from "@/lib/actions/upload";

interface Branch {
  id: number;
  name: string;
  nameEn: string | null;
  address: string | null;
  addressEn: string | null;
  phone: string | null;
  hours: string | null;
  hoursEn: string | null;
  status: string;
  image: string | null;
}

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  // Form State
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [address, setAddress] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("");
  const [hoursEn, setHoursEn] = useState("");
  const [status, setStatus] = useState("مفتوح");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getBranches();
    if (res.success && res.data) {
      setBranches(res.data as Branch[]);
    }
    setIsLoading(false);
  };

  const filtered = branches.filter(b =>
    b.name.includes(search) || (b.address || "").includes(search)
  );

  const handleOpenModal = (branch?: Branch) => {
    if (branch) {
      setEditingBranch(branch);
      setName(branch.name);
      setNameEn(branch.nameEn || "");
      setAddress(branch.address || "");
      setAddressEn(branch.addressEn || "");
      setPhone(branch.phone || "");
      setHours(branch.hours || "");
      setHoursEn(branch.hoursEn || "");
      setStatus(branch.status);
      setImage(branch.image);
    } else {
      setEditingBranch(null);
      setName("");
      setNameEn("");
      setAddress("");
      setAddressEn("");
      setPhone("");
      setHours("");
      setHoursEn("");
      setStatus("مفتوح");
      setImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingBranch(null);
      setName("");
      setNameEn("");
      setAddress("");
      setAddressEn("");
      setPhone("");
      setHours("");
      setHoursEn("");
      setStatus("مفتوح");
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

    if (editingBranch) {
      await updateBranch(editingBranch.id, { 
        name, nameEn,
        address, addressEn,
        phone,
        hours, hoursEn,
        status, 
        image: imageUrl || undefined 
      });
    } else {
      await addBranch({ 
        name, nameEn,
        address, addressEn,
        phone,
        hours, hoursEn,
        status, 
        image: imageUrl || undefined 
      });
    }

    await fetchData();
    setIsSaving(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الفرع؟")) {
      const res = await deleteBranch(id);
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
          <h1 className="text-3xl font-headline font-bold text-primary mb-1">فروعنا</h1>
          <p className="text-on-surface-variant">إدارة مواقع الفروع ومعلومات التواصل (إجمالي: {branches.length})</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          إضافة فرع جديد
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-4 text-on-surface-variant">search</span>
        <input
          type="text"
          placeholder="ابحث عن فرع..."
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
            لا توجد فروع حالياً.
          </div>
        ) : (
          filtered.map((branch) => (
            <div key={branch.id} className="bg-surface border border-outline-variant/30 rounded-[1.5rem] p-6 flex flex-col justify-between hover:border-primary/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-container text-primary rounded-xl flex items-center justify-center relative overflow-hidden shrink-0">
                    {branch.image ? (
                      <Image src={branch.image} alt={branch.name} fill className="object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-2xl">store</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{branch.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      branch.status === "مفتوح" ? "bg-[#E6F4EA] text-[#137333]" : "bg-error-container text-error"
                    }`}>
                      {branch.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(branch)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => handleDelete(branch.id)} className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/30 text-sm">
                <div className="flex items-start gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <p>{branch.address || "غير محدد"}</p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <p dir="ltr" className="text-right">{branch.phone || "غير محدد"}</p>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <p>{branch.hours || "غير محدد"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBranch ? "تعديل الفرع" : "إضافة فرع جديد"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUploader 
            label="صورة الفرع (اختياري)"
            initialImage={image}
            onImageChange={(file, url) => {
              setImageFile(file);
              if (!file && url) setImage(url);
              if (file) setImage(null);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">اسم الفرع (عربي)</label>
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
              <label className="block text-sm font-bold text-on-surface mb-2">اسم الفرع (إنجليزي)</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">رقم الهاتف</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">العنوان بالتفصيل (عربي)</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">العنوان بالتفصيل (إنجليزي)</label>
              <input
                type="text"
                value={addressEn}
                onChange={(e) => setAddressEn(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">ساعات العمل (عربي)</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="مثال: 9 ص - 11 م"
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-right"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">ساعات العمل (إنجليزي)</label>
              <input
                type="text"
                value={hoursEn}
                onChange={(e) => setHoursEn(e.target.value)}
                placeholder="مثال: 9 AM - 11 PM"
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">حالة الفرع</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-surface-container rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-on-surface appearance-none"
              >
                <option value="مفتوح">مفتوح</option>
                <option value="مغلق مؤقتاً">مغلق مؤقتاً</option>
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
