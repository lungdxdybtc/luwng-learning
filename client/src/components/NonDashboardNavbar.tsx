"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Bell, Search, BookOpen, LogIn, UserPlus } from "lucide-react"; // Thêm icons
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Để quản lý focus của search input (nếu cần)

  // Animation variants
  const navItemHover = {
    color: "var(--neon-blue)", // Màu neon khi hover
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  return (
    <motion.nav
      className="tech-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="tech-navbar__container">
        {/* Left Side: Brand and Main Navigation */}
        <div className="tech-navbar__left">
          <Link
            href="/"
            className="tech-navbar__brand tech-navbar__brand-glitchy"
            scroll={false}
          >
            <span data-text="NHOM 4 ">NHOM 19</span>
            <span className="tech-navbar__brand-highlight ml-4" data-text="CONCUU">
              DO AN CUOI KI
            </span>
          </Link>
          {/* Có thể thêm các link điều hướng chính ở đây nếu cần */}
          {/* Ví dụ:
          <Link href="/courses" className="tech-navbar__link">
            <motion.span variants={navItemHover} whileHover="hover">Khóa Học</motion.span>
          </Link>
          */}
        </div>

        {/* Center/Right Side: Search and Actions */}
        <div className="tech-navbar__right">
          {/* Search Input - Thiết kế tối giản */}
          <div
            className={`tech-navbar__search-wrapper ${isSearchFocused ? "tech-navbar__search-wrapper--focused" : ""}`}
          >
            <Search
              className="tech-navbar__search-icon-prefix"
              size={18}
              onClick={() =>
                document.getElementById("navbar-search-link")?.focus()
              } // Focus vào Link/Input khi click icon
            />
            <Link
              id="navbar-search-link"
              href="/search"
              className="tech-navbar__search-input-link"
              scroll={false}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            >
              <span className="hidden sm:inline">Tìm kiếm khóa học...</span>
              <span className="sm:hidden">Tìm kiếm...</span>
            </Link>
            {/* <BookOpen className="tech-navbar__search-icon-suffix" size={18} /> */}
          </div>

          {/* Actions: Notifications, User */}
          <div className="tech-navbar__actions">
            <motion.button
              className="tech-navbar__icon-button tech-navbar__notification-button"
              whileHover={{ scale: 1.1, color: "var(--neon-blue)" }}
              whileTap={{ scale: 0.9 }}
              aria-label="Notifications"
            >
              <span className="tech-navbar__notification-indicator"></span>
              <Bell size={20} />
            </motion.button>

            <SignedIn>
              <div className="tech-navbar__user-button-wrapper">
                <UserButton
                  appearance={{
                    baseTheme: dark, // Clerk dark theme
                    variables: {
                      colorPrimary: "var(--neon-blue)", // Màu chính cho các element trong Clerk UI
                      colorBackground: "var(--dark-bg-secondary)",
                      colorText: "var(--text-light)",
                      colorInputBackground: "var(--card-bg)",
                      colorInputText: "var(--text-light)",
                    },
                    elements: {
                      userButtonAvatarBox: {
                        width: "2.2rem", // Kích thước avatar
                        height: "2.2rem",
                        border: "2px solid var(--accent-border)", // Viền avatar
                        boxShadow: "0 0 10px rgba(var(--neon-blue-rgb), 0.3)",
                      },
                      userButtonOuterIdentifier:
                        "hidden sm:inline-block text-sm font-normal text-gray-300 hover:text-neon-blue transition-colors", // Tên người dùng
                      userButtonBox: "flex flex-row-reverse items-center gap-3", // Căn chỉnh lại avatar và tên
                      userButtonPopoverCard:
                        "bg-dark-bg-secondary border border-accent-border shadow-xl",
                      userButtonPopoverActionButton: "hover:bg-card-bg",
                      userButtonPopoverActionButtonText: "text-text-light",
                      userButtonPopoverFooter: "hidden", // Ẩn footer nếu không cần
                    },
                  }}
                  // showName={true} // Clerk tự động ẩn tên trên mobile
                  userProfileMode="navigation"
                  userProfileUrl={
                    userRole === "teacher"
                      ? "/teacher/profile"
                      : "/user/profile"
                  }
                />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/signin"
                className="tech-navbar__auth-link"
                scroll={false}
              >
                <motion.span
                  className="flex items-center gap-1.5"
                  whileHover={navItemHover}
                >
                  <LogIn size={18} /> Đăng nhập
                </motion.span>
              </Link>
              <Link
                href="/signup"
                className="tech-navbar__auth-button tech-navbar__auth-button--signup"
                scroll={false}
              >
                <motion.span
                  className="flex items-center gap-1.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus size={18} /> Đăng ký
                </motion.span>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NonDashboardNavbar;
