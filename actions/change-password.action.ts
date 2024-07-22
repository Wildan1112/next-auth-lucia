"use server";

import prisma from "@/lib/db";
import { lucia, validateRequest } from "@/lib/lucia/auth";
import { ChangePasswordSchema } from "@/lib/schema";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { z } from "zod";

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  try {
    const argon2 = new Argon2id();

    const { user } = await validateRequest();
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const isValidPassword = await argon2.verify(
      existingUser?.password!,
      values.password
    );
    if (!isValidPassword) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    const hashedPassword = await argon2.hash(values.newPassword);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });
    // Make session
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
