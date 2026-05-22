"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaGraduationCap, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLaptop, FaDollarSign, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetch(`http://localhost:8000/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        if (data && data._id) {
          setTutor(data);
        } else {
          console.log("Backend response without ID:", data);
          setTutor(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutor details:", err);
        setTutor(null);
        setLoading(false);
      });
  }, [id]);

  const handleBookSession = async () => {
    if (!user) {
      alert("Please login first to book a session!");
      router.push("/login");
      return;
    }

    setBookingLoading(true);

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      subject: tutor.subject,
      hourlyFee: tutor.hourlyFee,
      studentEmail: user.email,
      studentName: user.name,
    };

    try {
      const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        alert("Booking Successful! Token generated.");
        router.push("/my-bookings");
      } else {
        alert("Failed to book session. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center py-20 mt-20">
        <p className="text-error text-xl font-bold">Tutor not found in database!</p>
        <p className="text-gray-500 text-sm mt-2">Requested ID: {id}</p>
        <button onClick={() => router.push("/tutors")} className="btn btn-primary mt-4">
          Back to All Tutors
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-4 py-6 mt-20">
      <button onClick={() => router.push("/tutors")} className="btn btn-ghost gap-2 mb-6 font-semibold">
        <FaArrowLeft /> Back to Tutors
      </button>

      <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="relative h-72 md:h-full min-h-[350px] bg-base-200">
          <img
            src={tutor.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600"}
            alt={tutor.tutorName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-white font-extrabold px-4 py-2 rounded-xl shadow-lg flex items-center">
            <FaDollarSign /> {tutor.hourlyFee}/hr
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="badge badge-primary font-bold uppercase tracking-wider px-3 py-3 text-xs">
                {tutor.subject || "General"}
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-2 text-base-content">{tutor.tutorName}</h2>
            </div>
            <div className="divider my-0"></div>
            <div className="space-y-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              <p className="flex items-center gap-3">
                <FaGraduationCap className="text-primary text-lg shrink-0" />
                <span>{tutor.institution || "N/A"} ({tutor.experience || "0"} Exp)</span>
              </p>
              <p className="flex items-center gap-3">
                <FaCalendarAlt className="text-secondary text-lg shrink-0" />
                <span><strong>Available:</strong> {Array.isArray(tutor.availableDays) ? tutor.availableDays.join(', ') : tutor.availableDays || "N/A"}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-accent text-lg shrink-0" />
                <span><strong>Location:</strong> {tutor.location}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaLaptop className="text-info text-lg shrink-0" />
                <span><strong>Mode:</strong> {tutor.teachingMode || "Online"}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaClock className="text-warning text-lg shrink-0" />
                <span>
                  <strong>Slots Left:</strong>{" "}
                  {tutor.totalSlot > 0 ? (
                    <span className="badge badge-success text-warning font-bold">{tutor.totalSlot} available</span>
                  ) : (
                    <span className="badge badge-error text-white font-bold">Fully Booked</span>
                  )}
                </span>
              </p>
            </div>
          </div>

          <div>
            {tutor.totalSlot > 0 ? (
              <button
                onClick={handleBookSession}
                disabled={bookingLoading}
                className="btn btn-primary w-full rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all"
              >
                {bookingLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaCheckCircle /> Book Session Instantly
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="btn btn-error btn-disabled w-full rounded-xl font-bold text-lg text-white/70"
              >
                Fully Booked (No Slots Left)
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}