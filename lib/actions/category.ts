"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "فشل في جلب الأقسام" };
  }
}

export async function addCategory(data: { name: string; nameEn?: string; description?: string; descriptionEn?: string; tag?: string; tagEn?: string; image?: string }) {
  try {
    const category = await prisma.category.create({
      data,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, error: "فشل في إضافة القسم" };
  }
}

export async function updateCategory(id: number, data: { name?: string; nameEn?: string; description?: string; descriptionEn?: string; tag?: string; tagEn?: string; image?: string }) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "فشل في تعديل القسم" };
  }
}

export async function deleteCategory(id: number) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "فشل في حذف القسم (قد يكون هناك منتجات مرتبطة به)" };
  }
}
