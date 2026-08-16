"use server";

import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "abraj-super-secret-key-2026";
const key = new TextEncoder().encode(JWT_SECRET);

export async function login(username: string, password: string) {
  try {
    // 1. Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    // 2. If no admin exists in the entire DB, create the default one
    if (!admin) {
      const allAdmins = await prisma.admin.count();
      if (allAdmins === 0) {
        // Create default admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await prisma.admin.create({
          data: {
            username: username,
            password_hash: hashedPassword,
          },
        });
        
        return await createSession(newAdmin.id, newAdmin.username);
      }
      return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
    }

    // 3. Verify password
    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
    }

    // 4. Create Session
    return await createSession(admin.id, admin.username);

  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "حدث خطأ غير متوقع. حاول مرة أخرى." };
  }
}

async function createSession(adminId: number, username: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const token = await new SignJWT({ adminId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as { adminId: number; username: string };
  } catch (e) {
    return null;
  }
}

export async function updateAdminCredentials(newUsername: string, currentPassword?: string, newPassword?: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "جلسة غير صالحة" };
    
    const currentUsername = session.username;

    const admin = await prisma.admin.findUnique({
      where: { username: currentUsername },
    });

    if (!admin) {
      return { success: false, error: "المستخدم غير موجود" };
    }

    if (newPassword) {
      if (!currentPassword) {
        return { success: false, error: "يجب إدخال كلمة المرور الحالية لتغيير كلمة المرور" };
      }
      const isValid = await bcrypt.compare(currentPassword, admin.password_hash);
      if (!isValid) {
        return { success: false, error: "كلمة المرور الحالية غير صحيحة" };
      }
    }

    const dataToUpdate: any = { username: newUsername };

    if (newPassword) {
      dataToUpdate.password_hash = await bcrypt.hash(newPassword, 10);
    }

    // Check if new username is already taken by someone else
    if (newUsername !== currentUsername) {
      const existing = await prisma.admin.findUnique({
        where: { username: newUsername },
      });
      if (existing) {
        return { success: false, error: "اسم المستخدم محجوز مسبقاً" };
      }
    }

    const updated = await prisma.admin.update({
      where: { username: currentUsername },
      data: dataToUpdate,
    });

    // Refresh session with new username
    await createSession(updated.id, updated.username);

    return { success: true };
  } catch (error) {
    console.error("Update credentials error:", error);
    return { success: false, error: "فشل في تحديث بيانات الدخول" };
  }
}

export async function getAdminProfile(username: string) {
  const admin = await prisma.admin.findUnique({
    where: { username },
    select: { username: true },
  });
  return admin;
}
