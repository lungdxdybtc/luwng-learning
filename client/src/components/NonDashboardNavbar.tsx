"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
// import { light } from "@clerk/themes"; // Sử dụng theme light cho UserButton trên nền trắng
import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  // console.log("userRole:", userRole);
  // console.log(user);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50"> {/* Nền trắng, shadow, sticky */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Container chuẩn, padding ngang */}
        <div className="flex items-center justify-between h-16 md:h-20"> {/* flex, căn giữa, chiều cao */}
          
          {/* Phần bên trái: Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors duration-300" scroll={false}>
               NHOM 19 DO AN CUOI
            </Link>
          </div>

          {/* Phần bên phải: Search, Notification, Auth */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Link/Button - Style giống nút cam trong mẫu */}
            <Link
              href="/search"
              className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 text-sm"
              scroll={false}
            >
              <BookOpen
                className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" // Icon nhỏ hơn, màu trắng (do text-white)
              />
              <span className="hidden sm:inline">Search Courses</span>
              <span className="sm:hidden">Search</span> {/* Hiển thị "Search" trên mobile */}
            </Link>

            {/* Notification Button */}
            <button 
              title="Notifications"
              className="relative p-2 rounded-full text-stone-500 hover:text-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-orange-500 transition-colors duration-200"
            >
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500 ring-2 ring-white">
                <span className="sr-only">New notifications</span>
              </span>
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Auth Section */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:w-9",
                    userButtonOuterIdentifier: "text-sm font-medium text-stone-700 hover:text-orange-600 hidden sm:block", // Màu chữ cho tên
                    avatarBox: "border-2 border-transparent group-hover:border-orange-300", // Thêm hiệu ứng border khi hover
                  },
                }}
                showName={true}
                userProfileMode="navigation"
                userProfileUrl={
                  userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                }
              />
            </SignedIn>
            <SignedOut>
              <Link
                href="/signin"
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors duration-200"
                scroll={false}
              >
                Log in
              </Link>
              {/* Nút Sign up làm nổi bật giống nút Search */}
              <Link
                href="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 text-sm"
                scroll={false}
              >
                Sign up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NonDashboardNavbar;