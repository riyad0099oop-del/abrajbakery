"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: services };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false, error: "فشل في جلب الخدمات" };
  }
}

export async function addService(data: { title: string; titleEn?: string; description?: string; descriptionEn?: string; icon?: string; image?: string; status?: string }) {
  try {
    const service = await prisma.service.create({
      data,
    });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true, data: service };
  } catch (error) {
    console.error("Error adding service:", error);
    return { success: false, error: "فشل في إضافة الخدمة" };
  }
}

export async function updateService(id: number, data: { title?: string; titleEn?: string; description?: string; descriptionEn?: string; icon?: string; image?: string; status?: string }) {
  try {
    const service = await prisma.service.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true, data: service };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, error: "فشل في تعديل الخدمة" };
  }
}

export async function deleteService(id: number) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: "فشل في حذف الخدمة" };
  }
}
