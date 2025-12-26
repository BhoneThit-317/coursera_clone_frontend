import { axios } from "@/lib/axios";
import { handleApiError } from "@/lib/api-error";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");
    const userId = cookieStore.get("userId");

    if (!token || !userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { data } = await axios.get(`/Users/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return NextResponse.json({
      success: true,
      user: data,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return handleApiError(error);
  }
}
