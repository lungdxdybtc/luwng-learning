"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel"; // Giả định hook này hoạt động tốt
import { Skeleton } from "@/components/ui/skeleton"; // Giữ nguyên component UI này
import { useGetCoursesQuery } from "@/state/api";
// import Course from "@/components/courses/[courseId]/chapters/[chapterId]/page"; // Không dùng trực tiếp ở đây
import CourseCardSearch from "@/components/CourseCardSearch"; // Giữ nguyên component này
import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs"; // Bỏ comment nếu dùng

// --- Loading Skeleton với màu mới ---
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-orange-50 p-4 sm:p-6 lg:p-8">
      {/* Navbar Skeleton */}
      <div className="container mx-auto mb-8 flex justify-between items-center py-4">
        <Skeleton className="h-8 w-32 bg-orange-200 rounded" />
        <Skeleton className="h-10 w-24 bg-orange-300 rounded-md" />
      </div>

      {/* Hero Skeleton */}
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10 md:py-16">
        <div className="md:w-1/2 space-y-4">
          <Skeleton className="h-12 w-3/4 bg-orange-200 rounded" />
          <Skeleton className="h-6 w-full bg-orange-200 rounded" />
          <Skeleton className="h-6 w-5/6 bg-orange-200 rounded" />
          <Skeleton className="h-12 w-40 bg-orange-300 rounded-md mt-4" />
        </div>
        <div className="md:w-1/2">
          <Skeleton className="w-full h-64 md:h-96 bg-orange-200 rounded-lg" />
        </div>
      </div>

      {/* Featured Courses Skeleton */}
      <div className="container mx-auto py-10 md:py-16">
        <Skeleton className="h-10 w-1/2 md:w-1/3 mx-auto mb-4 bg-orange-200 rounded" />
        <Skeleton className="h-5 w-3/4 md:w-1/2 mx-auto mb-8 bg-orange-200 rounded" />
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className="h-8 w-28 bg-orange-200 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className="h-72 bg-orange-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};


const Landing = () => {
  // const {user} = useUser()
  // console.log("user:", user)
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 }); // Hook này quản lý index của ảnh hiện tại
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, { // Sửa query param format
      scroll: false,
    });
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error loading courses. Please try again later.</div>;

  const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"]; // Đường dẫn ảnh của bạn

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-orange-50 text-stone-700 min-h-screen flex flex-col"
    >

      {/* --- Hero Section --- */}
      <motion.header
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6">
            Explore Our <span className="text-orange-500">Courses</span>
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto md:mx-0">
            Discover a wide range of courses tailored to your needs. Learn at your own pace, anytime, anywhere.
          </p>
          <Link href="/search" scroll={false}>
            <div className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
            </div>
          </Link>
        </div>
        <div className="md:w-1/2 lg:w-2/5 mt-10 md:mt-0">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl group">
            {heroImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Hero Banner ${index + 1}`}
                fill
                priority={index === currentImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105
                  ${index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              />
            ))}
            {/* Optional: Carousel controls (dots/arrows) if your useCarousel hook supports them */}
          </div>
        </div>
      </motion.header>

      {/* --- Featured Courses Section --- */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ amount: 0.2, once: true }}
        className="bg-white py-16 md:py-24" // Section background can be white or a lighter cream like orange-100
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 text-center">
            Featured <span className="text-orange-500">Courses</span>
          </h2>
          <p className="text-lg text-stone-600 mb-12 text-center max-w-3xl mx-auto">
            From beginner to advanced, find the perfect course to kickstart your learning journey and achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-12">
            {[
              "Web Development",
              "Enterprise IT",
              "React & Next.js",
              "JavaScript",
              "Backend Development",
              "Data Science",
              "UI/UX Design"
            ].map((tag, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-orange-200 hover:text-orange-800 transition-colors shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {courses && courses.length > 0 ? (
              courses
                .slice(0, 4) // Displaying up to 4 featured courses
                .map((course, index) => (
                  <motion.div
                    key={course.courseId}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    viewport={{ amount: 0.3, once: true }}
                    className="h-full" // Ensure motion.div takes full height for card
                  >
                    {/* CourseCardSearch should ideally be styled with Tailwind too */}
                    {/* It should also handle its own internal layout and colors */}
                    <CourseCardSearch 
                      course={course} 
                      onClick={() => handleCourseClick(course.courseId)}
                    />
                  </motion.div>
                ))
            ) : (
              <p className="col-span-full text-center text-stone-500">No courses available at the moment.</p>
            )}
          </div>
           {courses && courses.length > 4 && (
            <div className="text-center mt-12">
              <Link href="/search" scroll={false} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  View All Courses
              </Link>
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Landing;