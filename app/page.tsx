import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/register");
  }
  return <h1>Hi, {user.username}!</h1>;
}