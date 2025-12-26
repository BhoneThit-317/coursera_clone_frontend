"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner"; // Using your installed toast library

// 1. Define the Validation Schema
const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to this specific field
  });

// Infer the type from the schema
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 3. Handle Form Submission
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await axios.post("/api/auth/register", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        roleId: "86e17136-caa3-47a1-b1dc-9c26772104b6", // Example RoleId
      });

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className={`relative block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.fullName
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Full Name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`relative block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.email
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className={`relative block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.password
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={`relative block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.confirmPassword
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
