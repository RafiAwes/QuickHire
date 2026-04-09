import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                QuickHire
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-8">About</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/" className="hover:text-white transition-colors">Companies</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Advice</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-8">Resources</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/" className="hover:text-white transition-colors">Help Docs</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Guide</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Updates</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-8">Get job notifications</h4>
            <p className="text-text-muted text-sm mb-6">The latest job news, articles, sent to your inbox weekly.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white border-none rounded-lg px-4 py-4 text-sm w-full text-text-main outline-none"
              />
              <button className="bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-text-muted">2021 @ QuickHire. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
