"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, User, Layout, LogOut, Menu, X } from "lucide-react"; // Added Menu/X for mobile
import axios from "axios";
import { toast } from "sonner";

// Define User Type based on your API response
interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string; // Optional if your backend returns null
}

export function NavHeader() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        // Silent fail: User is just not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 2. Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      router.refresh(); // Refresh server components
      router.push("/login"); // Go to login
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  // Helper for initials avatar if no image exists
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  if (loading) return null; // Or a skeleton loader if preferred

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* LEFT SECTION: LOGO & LINKS */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Lumina</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/courses"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Browse Courses
              </Link>
              <div className="relative group">
                <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1">
                  Categories <ChevronDown size={14} />
                </button>
                {/* Dropdown would go here - simplified for now */}
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-64 pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                  placeholder="What do you want to learn?"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: USER & AUTH */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 hidden sm:block"
                >
                  My Learning
                </Link>

                {/* USER DROPDOWN */}
                <div className="relative group cursor-pointer">
                  {user.avatarUrl ? (
                    <img
                      className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                      src={user.avatarUrl}
                      alt={user.fullName}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-700 font-bold">
                      {getInitials(user.fullName)}
                    </div>
                  )}

                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-slate-100 divide-y divide-slate-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left"
                      >
                        <Layout size={16} /> Dashboard
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
                >
                  Join for Free
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Optional simple implementation) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          <Link href="/courses" className="block text-sm font-medium text-slate-700">
            Browse Courses
          </Link>
          {/* Add more mobile links here */}
        </div>
      )}
    </nav>
  );
}
