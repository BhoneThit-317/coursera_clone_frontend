import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Lumina
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-slate-500 hover:text-indigo-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-base text-slate-500 hover:text-indigo-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-slate-500 hover:text-indigo-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/help" className="text-base text-slate-500 hover:text-indigo-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/teaching" className="text-base text-slate-500 hover:text-indigo-600">
                  Teaching Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/terms" className="text-base text-slate-500 hover:text-indigo-600">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-slate-500 hover:text-indigo-600">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">L</span>
              </div>
              <span className="font-bold text-lg text-slate-900">Lumina</span>
            </div>
            <p className="text-slate-500 text-sm">
              Empowering learners worldwide with accessible, high-quality education.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-slate-200 pt-8 flex items-center justify-between">
          <p className="text-base text-slate-400">
            &copy; {new Date().getFullYear()} Lumina Learning, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
