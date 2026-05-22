'use client';
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { RxCross2 } from "react-icons/rx";


export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  const fetchBookings = () => {
    if (!user?.email) return;
    fetch(`http://localhost:8000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.email]);

  const handleCancel = (id) => {
    fetch(`http://localhost:8000/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.modifiedCount > 0) {
        alert("Booking Cancelled!");
        fetchBookings();
      }
    });
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center text-base-content">My Booked Sessions</h1>
      
      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-300 bg-base-100 p-2">
        <table className="table w-full border-separate border-spacing-y-2">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Tutor Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="bg-base-100 hover:bg-base-200">
                <td className="p-4 text-base-content">{booking.studentName || 'Saiful'}</td>
                <td className="p-4 text-base-content">{booking.phone || '01999999999'}</td>
                <td className="p-4 text-base-content">{booking.tutorName}</td>
                <td className="p-4 text-base-content">{booking.studentEmail}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'cancelled' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {booking.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleCancel(booking._id)} className="btn btn-ghost btn-xs text-lg font-bold"><RxCross2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}