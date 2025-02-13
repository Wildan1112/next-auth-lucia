"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia, validateRequest } from "@/lib/lucia/auth";

export const logout = async (): Promise<ActionResult> => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
};

interface ActionResult {
  error: string | null;
}
