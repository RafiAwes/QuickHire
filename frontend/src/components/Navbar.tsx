import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Find Jobs', href: '/jobs' },
    { name: 'Browse Companies', href: '/' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-text-main">
              QuickHire
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-base font-medium text-text-muted hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-base font-bold text-primary hover:text-primary/80 transition-colors px-6 py-3">
              Login
            </button>
            <div className="w-[1px] h-6 bg-gray-200 mx-2" />
            <button className="bg-primary text-white text-base font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-muted hover:text-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out overflow-hidden z-50",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-base font-medium text-text-muted hover:text-primary hover:bg-gray-50 rounded-md"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full text-center py-3 text-base font-bold text-primary border border-primary rounded-lg">
              Login
            </button>
            <button className="w-full text-center py-3 text-base font-bold text-white bg-primary rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
