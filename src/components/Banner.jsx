"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Banner() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Welcome to MediQueue",
      title: "Find and Book Expert Tutors Instantly",
      description: "Eliminate manual scheduling chaos. Book premium online and offline learning sessions based on your preferred subject and timeline seamlessly.",
      btnText: "Explore Tutors",
      btnLink: "/tutors",
      bgClass: "from-blue-900 via-indigo-950 to-slate-950",
      badgeColor: "badge-primary"
    },
    {
      badge: "Conflict-Free Learning",
      title: "Smart Session Token Management",
      description: "Every successful booking automatically reserves your digital session token. Zero overlaps, zero hassle. Focus only on your growth.",
      btnText: "Book a Slot",
      btnLink: "/tutors",
      bgClass: "from-purple-950 via-violet-900 to-slate-950",
      badgeColor: "badge-secondary"
    },
    {
      badge: "Flexible Modes",
      title: "Learn Online, Offline or Both",
      description: "Customize your study roadmap with qualified instructors. Track hourly fees, available days, and experience parameters live.",
      btnText: "Get Started",
      btnLink: "/tutors",
      bgClass: "from-emerald-950 via-teal-900 to-slate-950",
      badgeColor: "badge-accent text-white"
    }
  ];


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="w-full h-[65vh] md:h-[80vh] relative overflow-hidden bg-slate-950 select-none">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].bgClass} text-white flex items-center justify-center px-6 md:px-20`}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl space-y-6"
          >
 
            <motion.span 
              variants={itemVariants}
              className={`badge ${slides[currentSlide].badgeColor} p-3 uppercase tracking-widest text-xs font-bold`}
            >
              {slides[currentSlide].badge}
            </motion.span>

            <motion.h1 
              variants={itemVariants}
              className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link 
                href={slides[currentSlide].btnLink} 
                className="btn btn-primary md:btn-lg rounded-xl gap-2 font-bold shadow-lg shadow-black/30 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {slides[currentSlide].btnText} <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
        <button 
          onClick={prevSlide} 
          className="btn btn-circle btn-sm md:btn-md bg-black/30 border-none text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
        >
          ❮
        </button> 
        <button 
          onClick={nextSlide} 
          className="btn btn-circle btn-sm md:btn-md bg-black/30 border-none text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-primary" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>

    </div>
  );
}