import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-sm mb-4 md:mb-0">
            © {currentYear}{" "}
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;