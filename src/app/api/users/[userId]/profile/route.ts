import { axios } from "@/lib/axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { data } = await axios.get("/Users");
    return NextResponse.json({ message: "success", data });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 },
    );
  }
}