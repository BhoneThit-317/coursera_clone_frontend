import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Delete the Access Token
  cookieStore.delete("accessToken");

  // Delete the User ID
  cookieStore.delete("userId");

  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
