"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "فشل في جلب المنتجات" };
  }
}

export async function addProduct(data: { name: string; nameEn?: string; priceEn?: string; categoryId: number; image?: string; status?: string }) {
  try {
    const product = await prisma.product.create({
      data,
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, data: product };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: "فشل في إضافة المنتج" };
  }
}

export async function updateProduct(id: number, data: { name?: string; nameEn?: string; priceEn?: string; categoryId?: number; image?: string; status?: string }) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, data: product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "فشل في تعديل المنتج" };
  }
}

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "فشل في حذف المنتج" };
  }
}
