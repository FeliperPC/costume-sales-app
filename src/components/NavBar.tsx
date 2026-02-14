"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 18H22V20H2V18Z" fill="white"/>
  <path d="M18 4H10C7.79086 4 6 5.79086 6 8V11H8V8C8 6.89543 8.89543 6 10 6H16V16H14V18H20V6C20 4.89543 19.1046 4 18 4Z" fill="white"/>
  
  <rect x="9" y="11" width="2" height="5" fill="white"/>
  <rect x="9.5" y="16" width="1" height="2" fill="white"/>
  
  <rect x="14" y="2" width="4" height="2" rx="1" fill="white"/>
  
  <circle cx="20" cy="10" r="2" fill="white"/>
</svg>
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