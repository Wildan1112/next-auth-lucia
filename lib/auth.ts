import { cache } from "react";
import { cookies } from "next/headers";

import prisma from "./db";
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user); // table user, table session

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "lucia-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      name: attributes.name,
      email: attributes.email,
    };
  },
});

// VALIDATE REQUEST or GET USER
export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  return result;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  email: string;
}
