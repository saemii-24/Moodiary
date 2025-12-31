"use client";
import { User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-14 bg-white border-b border-gray-200">
      <div className="flex h-full items-center justify-between px-4">
        <Link href="/home">
          <div className="text-lg font-semibold text-mood-red">Moodiary</div>
        </Link>

        <button
          aria-label="My Page"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-mood-red text-white hover:opacity-80 transition-opacity"
          onClick={() => {
            window.location.href = "/my";
          }}
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
