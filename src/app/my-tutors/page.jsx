"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MyTutorsPage() {
  const { data: session } = useSession();
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:8000/tutors?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setTutors(data));
    }
  }, [session]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this tutor?")) {
      const res = await fetch(`http://localhost:8000/tutors/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully!");
        setTutors(tutors.filter(t => t._id !== id));
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      tutorName: form.tutorName.value,
      photoUrl: form.photoUrl.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value,
      hourlyFee: form.hourlyFee.value,
      totalSlot: form.totalSlot.value,
      institution: form.institution.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,
      experience: form.experience.value,
    };

    const res = await fetch(`http://localhost:8000/tutors/${selectedTutor._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      toast.success("Updated successfully!");
      document.getElementById('update_modal').close();
      setTutors(tutors.map(t => t._id === selectedTutor._id ? { ...t, ...updatedData } : t));
    }
  };

  return (
    <div className="container mx-auto p-8">
      
      {/* Updated Table Section */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-2xl p-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-lg">
            <th className="p-4">Tutor Name</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Available Schedule</th>
            <th className="p-4">Hourly Fee</th>
            <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor._id} className="hover text-base">
                <td className="py-6 px-4 font-semibold">{tutor.tutorName}</td>
                <td className="py-6 px-4">{tutor.subject}</td>
                <td className="py-6 px-4 ">{tutor.availableDays}</td>
                <td className="py-6 px-4 font-bold text-primary">${tutor.hourlyFee}</td>
                <td className="py-6 px-4 flex justify-center gap-2">
                  <button 
                    className="btn btn-ghost btn-circle text-blue-500 hover:bg-blue-100" 
                    onClick={() => {
                      setSelectedTutor(tutor);
                      document.getElementById('update_modal').showModal();
                    }}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button 
                    className="btn btn-ghost btn-circle text-red-500 hover:bg-red-100" 
                    onClick={() => handleDelete(tutor._id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <dialog id="update_modal" className="modal modal-middle justify-center gap-4">
        <div className="modal-box w-11/12 max-w-2xl bg-white text-black p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2 text-center">Book Session</h2>
          <p className="text-center text-gray-500 mb-10">Make changes to your profile here. Click save when you're done.</p>
          
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mt-10">Tutor Name</label>
              <input name="tutorName" defaultValue={selectedTutor?.tutorName} className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Photo URL</label>
              <input name="photoUrl" defaultValue={selectedTutor?.photoUrl} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subject</label>
              <input name="subject" defaultValue={selectedTutor?.subject} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Available Days and Time</label>
              <input name="availableDays" defaultValue={selectedTutor?.availableDays} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Hourly Fee</label>
              <input name="hourlyFee" defaultValue={selectedTutor?.hourlyFee} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Slot</label>
              <input name="totalSlot" defaultValue={selectedTutor?.totalSlot} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Institution</label>
              <input name="institution" defaultValue={selectedTutor?.institution} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Location (Area/City)</label>
              <input name="location" defaultValue={selectedTutor?.location} className="input input-bordered w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Teaching Mode</label>
              <select name="teachingMode" defaultValue={selectedTutor?.teachingMode} className="select select-bordered w-full">
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Experience</label>
              <textarea name="experience" defaultValue={selectedTutor?.experience} className="textarea textarea-bordered w-full"></textarea>
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button type="button" className="btn btn-outline" onClick={() => document.getElementById('update_modal').close()}>Cancel</button>
              <button type="submit" className="btn btn-primary bg-black text-white">Confirm Booking</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}