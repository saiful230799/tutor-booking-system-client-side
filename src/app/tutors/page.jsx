"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLaptop, FaGraduationCap, FaSearch } from "react-icons/fa";

export default function TutorsAllPage() {
  const [tutors, setTutors] = useState([]); 
  const [filteredTutors, setFilteredTutors] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedSubject, setSelectedSubject] = useState("All"); 
  const [sortByPrice, setSortByPrice] = useState("default"); 

  useEffect(() => {
    fetch("http://localhost:8000/tutors")
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [];
        setTutors(safeData);
        setFilteredTutors(safeData); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!tutors || tutors.length === 0) {
      setFilteredTutors([]);
      return;
    }

    let result = [...tutors]; 

    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((tutor) => {
        const nameMatch = tutor.tutorName ? tutor.tutorName.toLowerCase().includes(query) : false;
        const subjectMatch = tutor.subject ? tutor.subject.toLowerCase().includes(query) : false;
        const locationMatch = tutor.location ? tutor.location.toLowerCase().includes(query) : false;
        
        return nameMatch || subjectMatch || locationMatch;
      });
    }

    if (selectedSubject && selectedSubject !== "All") {
      result = result.filter((tutor) => tutor.subject === selectedSubject);
    }

    if (sortByPrice === "lowToHigh") {
      result.sort((a, b) => (Number(a.hourlyFee) || 0) - (Number(b.hourlyFee) || 0));
    } else if (sortByPrice === "highToLow") {
      result.sort((a, b) => (Number(b.hourlyFee) || 0) - (Number(a.hourlyFee) || 0));
    }

    setFilteredTutors(result); 
  }, [searchQuery, selectedSubject, sortByPrice, tutors]); 

  const allSubjects = ["All", ...new Set(tutors.map((tutor) => tutor.subject).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 bg-base-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content">Find Your Perfect Tutor</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Search by name, filter by subject, or sort by hourly fees in real-time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-200 p-4 rounded-2xl shadow-sm border border-base-300">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tutor by name, subject or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="input input-bordered w-full pl-11 bg-base-100 rounded-xl focus:outline-primary"
            />
          </div>

          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)} 
              className="select select-bordered w-full bg-base-100 rounded-xl focus:outline-primary font-medium"
            >
              {allSubjects.map((sub, index) => (
                <option key={index} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)} 
              className="select select-bordered w-full bg-base-100 rounded-xl focus:outline-primary font-medium"
            >
              <option value="default">Sort by Price (Default)</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-2xl border border-dashed border-base-300">
            <p className="text-gray-500 text-lg font-medium">No tutors found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor) => (
              <div key={tutor._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between rounded-2xl overflow-hidden">
                <figure className="relative h-56 w-full bg-base-200">
                  <img
                    src={tutor.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"}
                    alt={tutor.tutorName || "Tutor"}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 badge badge-neutral font-semibold py-3 shadow-md">
                    ${tutor.hourlyFee || 0}/hr
                  </div>
                </figure>

                <div className="card-body p-6 space-y-3 flex-grow">
                  <span className="text-xs font-bold text-primary tracking-wider uppercase">
                    {tutor.subject || "General"}
                  </span>
                  <h3 className="card-title text-xl font-bold text-base-content">
                    {tutor.tutorName || "Unknown Tutor"}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 line-clamp-1">
                    <FaGraduationCap className="text-base" /> {tutor.institution || "N/A"} ({tutor.experience || "0 Years"} Exp)
                  </p>
                  
                  <div className="divider my-0"></div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-1">
                      <FaCalendarAlt className="text-primary text-sm shrink-0"/> 
                      <span className="truncate">
                        {Array.isArray(tutor.availableDays) ? tutor.availableDays.join(', ') : tutor.availableDays}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <FaClock className="text-secondary text-sm shrink-0"/> 
                      <span>
                        {tutor.totalSlot > 0 ? `${tutor.totalSlot} left` : "Full"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-accent text-sm shrink-0"/> 
                      <span className="truncate">{tutor.location || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <FaLaptop className="text-info text-sm shrink-0"/> 
                      <span>{tutor.teachingMode || "Online"}</span>
                    </p>
                  </div>

                  <div className="card-actions mt-2">
                    <Link href={`/tutors/${tutor._id}`} className="btn btn-primary btn-sm w-full font-bold">
                      Book Session
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}