"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes"; // Giữ lại nếu bạn muốn UserButton có theme tối
import { Bell, Menu, X, Search, LogIn, UserPlus } from "lucide-react"; // Thêm icon
import { motion, AnimatePresence } from "framer-motion"; // Cho animation

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Thay đổi giao diện sau khi cuộn 20px
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBackgroundClass = scrolled
    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg" // Nền mờ khi cuộn
    : "bg-transparent"; // Trong suốt ban đầu

  // Điều chỉnh màu chữ cho link dựa trên việc navbar đã cuộn hay chưa và theme
  const linkTextColorClass = scrolled
    ? "text-slate-700 dark:text-slate-200"
    : "text-slate-800 dark:text-white"; // Màu chữ ban đầu (giả sử nền landing page sáng)

  const hoverLinkTextColorClass = "hover:text-orange-500 dark:hover:text-orange-400";

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${navBackgroundClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Container cho nội dung căn giữa */}
        <div className="flex items-center justify-between h-16 md:h-20"> {/* Tăng chiều cao navbar */}
          {/* Logo */}
          <Link
            href="/"
            className={`font-bold text-xl md:text-2xl transition-colors duration-300 tracking-tight
              ${scrolled ? 'text-orange-500 dark:text-orange-400' : 'text-orange-500 dark:text-orange-400'}
              hover:text-orange-600 dark:hover:text-orange-300`}
          >
            NHÓM 19 {/* Có thể thay bằng logo image nếu có */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/search"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${linkTextColorClass} ${hoverLinkTextColorClass}
                hover:bg-orange-50 dark:hover:bg-slate-800`}
            >
              <Search size={18} />
              Search Course
            </Link>

            {/* Các link khác có thể thêm vào đây */}
            {/* <Link href="/about" className={`px-3 py-2 rounded-md text-sm font-medium ${linkTextColorClass} ${hoverLinkTextColorClass}`}>Về chúng tôi</Link> */}

            <SignedIn>
              <button className={`relative p-2 rounded-full ${linkTextColorClass} ${hoverLinkTextColorClass} hover:bg-orange-50 dark:hover:bg-slate-800`}
                aria-label="Notifications"
              >
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-slate-800"></span>
                <Bell size={20} />
              </button>
              <UserButton
                appearance={{
                  baseTheme: dark, // Hoặc light theme
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                    userButtonPopoverCard: "dark:bg-slate-800",
                  },
                }}
                userProfileMode="navigation"
                userProfileUrl={
                  userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                }
              />
            </SignedIn>

            <SignedOut>
              <Link
                href="/signin"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300
                  ${linkTextColorClass} ${hoverLinkTextColorClass}
                  border ${scrolled ? 'border-slate-300 dark:border-slate-700' : 'border-slate-400 dark:border-slate-500'}
                  hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>

          {/* Hamburger Icon & Mobile User Controls */}
          <div className="md:hidden flex items-center">
             <SignedIn>
               <button className={`relative p-1.5 mr-2 rounded-full ${linkTextColorClass} ${hoverLinkTextColorClass} hover:bg-orange-50 dark:hover:bg-slate-800`}
                aria-label="Thông báo"
               >
                <span className="absolute top-0.5 right-0.5 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-slate-800"></span>
                <Bell size={20} />
              </button>
              <div className="mr-2"> {/* Wrapper for UserButton to control margin */}
                <UserButton
                    appearance={{
                      baseTheme: dark, // Or light
                      elements: {
                        userButtonAvatarBox: "w-8 h-8", // Slightly smaller for mobile
                      },
                    }}
                    userProfileMode="navigation"
                    userProfileUrl={ userRole === "teacher" ? "/teacher/profile" : "/user/profile" }
                  />
              </div>
            </SignedIn>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`focus:outline-none p-2 rounded-md ${linkTextColorClass} ${hoverLinkTextColorClass}`}
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`md:hidden absolute top-full left-0 w-full shadow-xl pb-4 pt-2
              ${scrolled ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800'} `} // Nền menu mobile nhất quán với navbar
          >
            <div className="px-5 pt-2 pb-3 space-y-1">
              <Link
                href="/search"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${linkTextColorClass} ${hoverLinkTextColorClass} hover:bg-orange-50 dark:hover:bg-slate-700`}
              >
                <Search size={20} /> Search Course
              </Link>
              {/* Các link khác cho mobile */}
              <SignedIn>
                <Link
                  href={userRole === "teacher" ? "/teacher/profile" : "/user/profile"}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${linkTextColorClass} ${hoverLinkTextColorClass} hover:bg-orange-50 dark:hover:bg-slate-700`}
                >
                  Profile
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${linkTextColorClass} ${hoverLinkTextColorClass} hover:bg-orange-50 dark:hover:bg-slate-700`}
                >
                  <LogIn size={20} /> Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 mt-1 px-3 py-3 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600`}
                >
                 <UserPlus size={20} /> Sign Up
                </Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NonDashboardNavbar;