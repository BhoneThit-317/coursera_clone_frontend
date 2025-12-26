import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export function handleApiError(error: unknown) {
  // 1. Handle Axios Errors (Responses from your .NET backend)
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;

    // OData services often return errors in error.response.data.error
    const odataError = error.response?.data?.error;
    const message = odataError?.message || error.response?.data?.message || error.message;

    // Optional: Log detailed error on server for debugging
    console.error(`[API Error] ${status}:`, JSON.stringify(error.response?.data, null, 2));

    return NextResponse.json(
      {
        success: false,
        message: message,
        // Include validation errors if available (common in .NET 400 responses)
        errors: error.response?.data?.errors || undefined,
      },
      { status }
    );
  }

  // 2. Handle Generic/Unexpected Errors
  console.error("[Unknown Error]:", error);
  return NextResponse.json(
    { success: false, message: "An unexpected internal server error occurred." },
    { status: 500 }
  );
}
