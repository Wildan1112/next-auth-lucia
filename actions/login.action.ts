"use server";

import { z } from "zod";
import { loginSchema } from "@/lib/schema";
import prisma from "@/lib/db";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const login = async (request: z.infer<typeof loginSchema>) => {
  try {
    // Fetch user
    const user = await prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (!user || !user.password) {
      return {
        success: false,
        error: "Invalid Credentials",
      };
    }
    // Verify password
    const validPassword = await new Argon2id().verify(
      user.password,
      request.password
    );
    // Check if password don't match
    if (!validPassword) {
      return {
        success: false,
        error: "Email or password invalid",
      };
    }
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
      error: "Something went wrong!",
    };
  }
};
