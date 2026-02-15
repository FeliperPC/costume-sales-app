"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X, VenetianMaskIcon } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <VenetianMaskIcon />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
            pinda.studio
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link
            href="/trajes"
            className="hover:text-purple-400 transition-colors"
          >
            Trajes
          </Link>

          <Link
            href="/sobre-nos"
            className="hover:text-purple-400 transition-colors"
          >
            Sobre Nós
          </Link>

          <Link
            href="/admin"
            className="hover:text-purple-400 transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 p-6 flex flex-col gap-4 border-b border-purple-500/30 animate-in slide-in-from-top-50">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-left py-2 text-white"
          >
            Início
          </Link>

          <Link
            href="/sobre-nos"
            onClick={() => setIsMenuOpen(false)}
            className="text-left py-2 text-white"
          >
            Sobre nós
          </Link>

          <Link
            href="/trajes"
            onClick={() => setIsMenuOpen(false)}
            className="text-left py-2 text-white"
          >
            Trajes
          </Link>

          <Link
            href="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="text-left py-2 text-white"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
