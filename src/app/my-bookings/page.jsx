"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client"; // তোর অথেন্টিকেশন হুক

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession(); // লগইন থাকা ইউজারের ডাটা
  const user = session?.user;

  useEffect(() => {
    // ইউজারের ইমেইল না থাকলে ফেচ করার দরকার নেই
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    // ডাইনামিক ইমেইল দিয়ে ডাটা ফেচ করা
    fetch(`http://localhost:8000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 min-h-[70vh]">
      <h1 className="text-3xl font-extrabold text-base-content mb-8">My Booked Sessions</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-base-200 rounded-2xl border border-dashed border-base-300">
          <p className="text-gray-500 text-lg font-medium">You have no booked sessions yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="card bg-base-100 shadow-xl border border-base-200 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-primary">{booking.tutorName}</h2>
              <div className="divider my-2"></div>
              <p className="text-sm font-medium text-gray-600">
                <span className="font-bold">Subject:</span> {booking.subject}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <span className="font-bold">Hourly Fee:</span> ${booking.hourlyFee}
              </p>
              <div className="mt-4">
                 <span className="badge badge-success text-white font-bold">Confirmed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}