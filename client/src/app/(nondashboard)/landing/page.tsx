"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel"; // Assuming this hook is fine
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import CourseCardSearch from "@/components/CourseCardSearch";
// import { useUser } from "@clerk/nextjs"; // Not used in this component directly
import { ArrowRight, Zap, BookOpen, TrendingUp, Search } from "lucide-react"; // Added icons

// --- Modernized Loading Skeleton ---
const LoadingSkeleton = () => (
  <div className="landing-skeleton min-h-screen bg-slate-50 p-6 md:p-12 space-y-16">
    {/* Hero Skeleton */}
    <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 pt-10">
      <div className="flex-1 space-y-6">
        <Skeleton className="h-16 w-4/5" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-12 w-48 rounded-lg" />
      </div>
      <div className="flex-1">
        <Skeleton className="h-80 w-full md:h-96 rounded-2xl" />
      </div>
    </div>
    {/* Featured Courses Skeleton */}
    <div className="container mx-auto space-y-10">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-6 w-1/2" />
      <div className="flex flex-wrap gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((_, i) => (
          <Skeleton key={i} className="h-60 w-full rounded-xl shadow-lg" />
        ))}
      </div>
    </div>
  </div>
);

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading } = useGetCoursesQuery({});
  // const { user } = useUser(); // Example if you need user info

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, { scroll: false });
  };

  if (isLoading) return <LoadingSkeleton />;

  const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"]; // Define hero images array

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-slate-50 to-orange-50 text-slate-800 min-h-screen overflow-x-hidden"
    >
      {/* --- Hero Section --- */}
      <section className="relative py-20 md:py-32 px-6">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/30 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-300/30 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <motion.div
            variants={itemVariants}
            className="flex-1 lg:w-1/2 text-center lg:text-left space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Unlock Your <span className="text-orange-500">Potential</span>.
              <br />
              Discover <span className="text-sky-500">New Skills</span>.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore a universe of courses designed to elevate your career and
              passions. Start your learning adventure today!
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/search" scroll={false}>
                <button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto lg:mx-0">
                  Explore Courses <ArrowRight size={20} />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 lg:w-1/2 mt-10 lg:mt-0"
          >
            <div className="relative w-full h-72 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
              {heroImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Creative Learning Environment ${i + 1}`}
                  fill
                  priority={i === currentImage}
                  className={`object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 ${
                    i === currentImage
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ))}
              {/* Carousel navigation (optional, simple dots) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    // onClick={() => setCurrentImage(i)} // If your useCarousel allows setting image
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? "bg-orange-500 scale-125"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Why Choose Us / Features Section (NEW) --- */}
      <section className="py-16 md:py-24 bg-white px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Why Learn With Us?
            </h2>
            <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
              We provide a dynamic and supportive environment to help you
              achieve your learning goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen size={36} className="text-orange-500" />,
                title: "Expert-Led Courses",
                description:
                  "Learn from industry professionals and experienced educators.",
              },
              {
                icon: <Zap size={36} className="text-sky-500" />,
                title: "Interactive Learning",
                description:
                  "Engage with hands-on projects and collaborative assignments.",
              },
              {
                icon: <TrendingUp size={36} className="text-green-500" />,
                title: "Career Growth",
                description:
                  "Acquire in-demand skills to advance your career prospects.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="mb-4 p-3 bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Courses Section --- */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 md:mb-16 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Featured Courses
            </h2>
            <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto md:mx-0">
              Handpicked courses to kickstart your journey or take your skills
              to the next level.
            </p>
          </motion.div>

          {/* Category Tags - More interactive look */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center md:justify-start mb-8 md:mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              "Web Dev",
              "IT & Software",
              "React",
              "JavaScript",
              "Backend",
              "Data Science",
            ].map((tag) => (
              <motion.button
                key={tag}
                className="px-5 py-2 bg-white text-orange-600 rounded-full text-sm font-medium shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
                whileHover={{ y: -2 }}
                // onClick={() => console.log(`Filter by ${tag}`)} // Add filter logic if needed
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses?.slice(0, 4).map((course, i) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }} // Staggered delay
                viewport={{ once: true, amount: 0.3 }}
                className="h-full" // Ensure cards in a row take full height if content differs
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                  // You might want to pass additional props to CourseCardSearch for styling consistency
                  // e.g., className="transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
            {/* Placeholder if no courses or fewer than 4 */}
            {(courses?.length || 0) < 1 && (
              <p className="col-span-full text-center text-slate-500">
                No featured courses available at the moment.
              </p>
            )}
          </div>
          {courses && courses.length > 4 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/search" scroll={false}>
                <button className="bg-sky-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                  View All Courses <Search size={20} />
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- Call to Action Section (NEW) --- */}
      <section className="relative py-16 md:py-24 bg-slate-50 dark:bg-slate-900 px-6 overflow-hidden">
        {/* Các yếu tố trang trí nền mờ (tùy chọn, tạo thêm chiều sâu) */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-200/20 dark:bg-orange-600/10 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-200/20 dark:bg-sky-600/10 rounded-full filter blur-3xl opacity-60 animate-pulse-slow animation-delay-2000"></div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-slate-800 dark:text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Ready to Start Your{" "}
            <span className="text-orange-500">Learning Journey</span>?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Join thousands of learners who are upgrading their skills and
            achieving their goals with our platform.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link href="/signup" scroll={false}>
              {" "}
              {/* Đổi link sang /signup nếu hợp lý hơn */}
              <button className="bg-orange-500 text-white font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-lg focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-700">
                Get Started Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;
