"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getBranches() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: branches };
  } catch (error) {
    console.error("Error fetching branches:", error);
    return { success: false, error: "فشل في جلب الفروع" };
  }
}

export async function addBranch(data: { name: string; nameEn?: string; address?: string; addressEn?: string; phone?: string; hours?: string; hoursEn?: string; status?: string; image?: string }) {
  try {
    const branch = await prisma.branch.create({
      data,
    });
    revalidatePath("/admin/branches");
    revalidatePath("/");
    return { success: true, data: branch };
  } catch (error) {
    console.error("Error adding branch:", error);
    return { success: false, error: "فشل في إضافة الفرع" };
  }
}

export async function updateBranch(id: number, data: { name?: string; nameEn?: string; address?: string; addressEn?: string; phone?: string; hours?: string; hoursEn?: string; status?: string; image?: string }) {
  try {
    const branch = await prisma.branch.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/branches");
    revalidatePath("/");
    return { success: true, data: branch };
  } catch (error) {
    console.error("Error updating branch:", error);
    return { success: false, error: "فشل في تعديل الفرع" };
  }
}

export async function deleteBranch(id: number) {
  try {
    await prisma.branch.delete({
      where: { id },
    });
    revalidatePath("/admin/branches");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting branch:", error);
    return { success: false, error: "فشل في حذف الفرع" };
  }
}
