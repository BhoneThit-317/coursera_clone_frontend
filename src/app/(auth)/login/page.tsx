"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// 1. Define Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Handle Submission
  const onSubmit = async (data: LoginFormValues) => {
    try {
      await axios.post("/api/auth/login", data);

      toast.success("Logged in successfully!");

      // Refresh router to update server components (cookies)
      router.refresh();
      router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`relative block w-full rounded-t-md border-0 p-3 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.email
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Email address"
                {...register("email")}
              />
              {/* Note: In a grouped input like this, errors are usually better shown below the whole group or as toast, 
                  but we can render them inline if preferred. Since it's a 'stack', error text might break the border visually.
                  Let's keep error text simple here. */}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={`relative block w-full rounded-b-md border-0 p-3 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.password
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Password"
                {...register("password")}
              />
            </div>
          </div>

          {/* Explicit Error Messages Area */}
          {(errors.email || errors.password) && (
            <div className="text-sm text-red-600 space-y-1">
              {errors.email && <p>{errors.email.message}</p>}
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
