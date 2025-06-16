"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-50 px-4 py-2 flex items-center justify-between">
      <Link href="/">
        <div className="flex flex-col leading-tight">
          <span className="text-lg md:text-2xl font-bold text-[#a91f64]">
            Homr Management
          </span>
          <span className="text-sm text-gray-500 tracking-widest self-center">
            Manage like a boss
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3 text-gray-600 text-xl">
        <div className="flex flex-row md:flex-row md:items-center gap-1.5 md:space-x-3 space-y-2 md:space-y-0">
          <Link
            href="/login"
            className="bg-green-600 px-1.5 py-0.5 rounded hover:bg-green-700 hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;