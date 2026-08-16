"use server";

import { supabase } from "../supabase";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "لم يتم العثور على ملف" };
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return { success: false, error: "فشل في رفع الصورة إلى السحابة" };
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (error) {
    console.error("Server upload error:", error);
    return { success: false, error: "حدث خطأ غير متوقع أثناء الرفع" };
  }
}
