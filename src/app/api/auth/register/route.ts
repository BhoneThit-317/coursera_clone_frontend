import { axios } from "@/lib/axios";
import { handleApiError } from "@/lib/api-error";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, roleId } = body;

    if (!fullName || !email || !password || !roleId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      FullName: fullName,
      Email: email,
      PasswordHash: password,
      RoleId: roleId,
      // REMOVE the hardcoded RoleId.
      // Let the C# controller assign the 'Student' role automatically.
    };
    console.log("Register payload:", payload);

    const { data } = await axios.post("/Users", payload);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
