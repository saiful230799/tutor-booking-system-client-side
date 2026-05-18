"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaBookReader, FaRegClock, FaUsers, FaGraduationCap, FaAward } from "react-icons/fa";

export default function TutorsSection() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/tutors?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="space-y-20 pb-20 bg-base-100 mt-20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content">Available Tutors</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
            Handpicked professional mentors ready to help you crack your complex university curriculum.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tutors.map((tutor) => (
              <motion.div 
                key={tutor._id} 
                variants={cardVariants}
                className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
               
                <figure className="relative h-56 w-full bg-base-200 overflow-hidden">
                  <img
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 badge badge-neutral font-semibold py-3 shadow-md">
                    ${tutor.hourlyFee}/hr
                  </div>
                </figure>

                <div className="card-body p-6 space-y-3 flex-grow">
                  <span className="text-xs font-bold text-primary tracking-wider uppercase">
                    {tutor.subject}
                  </span>
                  <h3 className="card-title text-xl font-bold text-base-content">
                    {tutor.tutorName}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    🏫 {tutor.institution} ({tutor.experience} Exp)
                  </p>
                  
                  <div className="divider my-1"></div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <p>📅 <strong>Days:</strong> {tutor.availableDays}</p>
                    <p>⏰ <strong>Slots:</strong> {tutor.totalSlot > 0 ? `${tutor.totalSlot} left` : <span className="text-red-500 font-bold">Fully Booked</span>}</p>
                    <p>📍 <strong>City:</strong> {tutor.location}</p>
                    <p>💻 <strong>Mode:</strong> {tutor.teachingMode}</p>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link href={`/tutors/${tutor._id}`} className="btn btn-primary btn-sm md:btn-md w-full rounded-lg font-bold">
                      Book Session
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-base-100 rounded-xl shadow-sm space-y-3 border border-base-300">
            <FaChalkboardTeacher className="text-4xl text-primary" />
            <h4 className="text-xl font-bold">Verified Educators</h4>
            <p className="text-sm text-gray-500">Every instructor undergoes a strict verification process.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-base-100 rounded-xl shadow-sm space-y-3 border border-base-300">
            <FaBookReader className="text-4xl text-secondary" />
            <h4 className="text-xl font-bold">Instant Approvals</h4>
            <p className="text-sm text-gray-500">Get automatic digital tokens right after slot reservation.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-base-100 rounded-xl shadow-sm space-y-3 border border-base-300">
            <FaRegClock className="text-4xl text-accent" />
            <h4 className="text-xl font-bold">Zero Conflicts</h4>
            <p className="text-sm text-gray-500">Automated limits block overlapping double student classes.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="space-y-2 py-4 md:py-0">
              <FaUsers className="text-4xl mx-auto opacity-90" />
              <h3 className="text-4xl font-extrabold">15,000+</h3>
              <p className="text-sm tracking-wide opacity-80 font-medium">Active Students</p>
            </div>
            <div className="space-y-2 py-4 md:py-0">
              <FaGraduationCap className="text-4xl mx-auto opacity-90" />
              <h3 className="text-4xl font-extrabold">450+</h3>
              <p className="text-sm tracking-wide opacity-80 font-medium">Certified Tutors</p>
            </div>
            <div className="space-y-2 py-4 md:py-0">
              <FaAward className="text-4xl mx-auto opacity-90" />
              <h3 className="text-4xl font-extrabold">99.2%</h3>
              <p className="text-sm tracking-wide opacity-80 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}