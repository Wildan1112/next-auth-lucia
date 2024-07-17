"use server";

import { github, google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const githubOauth = async () => {
  // TODO
  // try {
  //   const state = generateState();
  //   const url = await github.createAuthorizationURL(state);
  //   cookies().set("github_oauth_state", state, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //   });
  //   return { success: true, url: url.toString() };
  // } catch (error) {
  //   return { success: false, error: "Something went wrong" };
  // }
};

export const oAuthGoogle = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email", "profile"],
    });
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};
