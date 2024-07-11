"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import { Argon2id } from "oslo/password";

import { registerSchema } from "@/lib/schema";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

export const register = async (request: z.infer<typeof registerSchema>) => {
  try {
    // Check if existing user return error
    const existingUser = await prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });
    if (existingUser) {
      return { error: "User already exists", success: false };
    }

    // Hashed password
    const hashedPassword = await new Argon2id().hash(request.password);
    // create user
    const user = await prisma.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: hashedPassword,
      },
    });
    // Make session
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
