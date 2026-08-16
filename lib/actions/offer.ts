"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getOffers() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: offers };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return { success: false, error: "فشل في جلب العروض" };
  }
}

export async function addOffer(data: { title: string; titleEn?: string; description?: string; descriptionEn?: string; discount: string; discountEn?: string; badge?: string; badgeEn?: string; image?: string; status?: string }) {
  try {
    const offer = await prisma.offer.create({
      data,
    });
    revalidatePath("/admin/offers");
    revalidatePath("/");
    return { success: true, data: offer };
  } catch (error) {
    console.error("Error adding offer:", error);
    return { success: false, error: "فشل في إضافة العرض" };
  }
}

export async function updateOffer(id: number, data: { title?: string; titleEn?: string; description?: string; descriptionEn?: string; discount?: string; discountEn?: string; badge?: string; badgeEn?: string; image?: string; status?: string }) {
  try {
    const offer = await prisma.offer.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/offers");
    revalidatePath("/");
    return { success: true, data: offer };
  } catch (error) {
    console.error("Error updating offer:", error);
    return { success: false, error: "فشل في تعديل العرض" };
  }
}

export async function deleteOffer(id: number) {
  try {
    await prisma.offer.delete({
      where: { id },
    });
    revalidatePath("/admin/offers");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting offer:", error);
    return { success: false, error: "فشل في حذف العرض" };
  }
}
