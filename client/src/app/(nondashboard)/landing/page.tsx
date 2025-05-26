"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel"; // Giả sử hook này vẫn hoạt động tốt
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";

// --- LOADING SKELETON (Cập nhật để phản ánh layout mới) ---
const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton-creative">
      {/* Hero Skeleton */}
      <div className="landing-skeleton-creative__hero">
        <Skeleton className="landing-skeleton-creative__hero-bg" />
        <div className="landing-skeleton-creative__hero-content">
          <Skeleton className="landing-skeleton-creative__title" />
          <Skeleton className="landing-skeleton-creative__subtitle" />
          <Skeleton className="landing-skeleton-creative__button" />
        </div>
      </div>

      {/* Featured Courses Skeleton */}
      <div className="landing-skeleton-creative__featured">
        <Skeleton className="landing-skeleton-creative__featured-title" />
        <Skeleton className="landing-skeleton-creative__featured-description" />
        <div className="landing-skeleton-creative__tags">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton-creative__tag" />
          ))}
        </div>
        <div className="landing-skeleton-creative__courses-carousel">
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton-creative__course-card" />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- LANDING PAGE COMPONENT ---
const Landing = () => {
  const router = useRouter();
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"]; // Đảm bảo bạn có các ảnh này trong public
  const currentImageIndex = useCarousel({ totalImages: heroImages.length, interval: 5000 }); // Thêm interval cho tự động chuyển

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, { scroll: false });
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <p className="text-center text-red-500 py-10">Error loading courses. Please try again later.</p>;

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: "easeInOut" },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div {...fadeIn} className="landing-creative">
      {/* HERO SECTION - Full Screen, Centered Content */}
      <motion.section className="landing-creative__hero">
        <div className="landing-creative__hero-image-container">
          {heroImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ opacity: { duration: 1.5, ease: "easeInOut" } }} // Cross-fade
              className="landing-creative__hero-img-wrapper"
            >
              <Image
                src={src}
                alt={`Hero Image ${index + 1}`}
                fill
                priority={index === currentImageIndex}
                sizes="100vw"
                className="object-cover" // Đảm bảo ảnh cover toàn bộ
              />
            </motion.div>
          ))}
          <div className="landing-creative__hero-overlay" /> {/* Lớp phủ tối màu để text dễ đọc hơn */}
        </div>

        <motion.div
          className="landing-creative__hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.h1 {...fadeInUp} className="landing-creative__title">
            KHÁM PHÁ TRI THỨC MỚI
          </motion.h1>
          <motion.p {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="landing-creative__description">
            Tìm kiếm và đăng ký các khóa học chất lượng hàng đầu,
            <br />
            phù hợp với lộ trình phát triển của bạn.
          </motion.p>
          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }}>
            <Link href="/search" scroll={false}>
              <motion.button
                className="landing-creative__cta-button"
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(var(--primary-rgb, 52, 152, 219), 0.4)"}} // Thay var(--primary-rgb) bằng màu chính của bạn nếu có
                whileTap={{ scale: 0.95 }}
              >
                Bắt đầu Tìm kiếm
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* FEATURED COURSES SECTION - Horizontal Scroll */}
      <motion.section
        className="landing-creative__featured"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }} // Trigger khi 10% section vào view
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="landing-creative__featured-title">
          Khóa Học Nổi Bật
        </motion.h2>
        <motion.p variants={fadeInUp} className="landing-creative__featured-description">
          Những khóa học được đánh giá cao và lựa chọn nhiều nhất.
          <br />
          Đầu tư vào bản thân ngay hôm nay!
        </motion.p>
        <motion.div variants={fadeInUp} className="landing-creative__tags">
          {[
            "Web Development",
            "Data Science",
            "UX/UI Design",
            "Marketing",
            "AI & Machine Learning",
          ].map((tag, index) => (
            <motion.span
              key={index}
              className="landing-creative__tag"
              whileHover={{ y: -3, backgroundColor: "rgba(var(--primary-rgb, 52, 152, 219), 0.1)" }} // Nhẹ nhàng hơn
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={fadeIn} className="landing-creative__courses-carousel-wrapper">
          <div className="landing-creative__courses-carousel">
            {courses && courses.length > 0 ? (
              courses
                .slice(0, 6) // Hiển thị nhiều hơn cho carousel
                .map((course, index) => (
                  <motion.div
                    key={course.courseId}
                    className="landing-creative__course-card-item"
                    // variants={fadeInUp} // Có thể dùng variants của parent container
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }} // amount cho từng card
                  >
                    <CourseCardSearch // Giả sử CourseCardSearch đã được style phù hợp
                      course={course}
                      onClick={() => handleCourseClick(course.courseId)}
                    />
                  </motion.div>
                ))
            ) : (
              <p className="col-span-full text-center">Hiện chưa có khóa học nổi bật nào.</p>
            )}
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Landing;