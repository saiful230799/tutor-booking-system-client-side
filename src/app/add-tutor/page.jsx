"use client";
import { useSession } from "@/lib/auth-client";
import { toast } from 'react-toastify';

export default function AddTutorPage() {
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const tutorData = {
      tutorName: form.tutorName.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value.split(','),
      timeSlot: form.timeSlot.value,
      hourlyFee: parseFloat(form.hourlyFee.value),
      totalSlot: parseInt(form.totalSlot.value),
      sessionDate: form.sessionDate.value,
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,
      userEmail: session?.user?.email,
    };

    try {
      const res = await fetch("http://localhost:8000/tutors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorData),
      });

      if (res.ok) {
        toast.success("Tutor added successfully!");
        form.reset();
      } else {
        toast.error("Failed to add tutor. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-2xl mx-auto space-y-4">
      <input name="tutorName" placeholder="Tutor Name" className="input input-bordered w-full" required />
      <input name="photo" placeholder="Photo URL" className="input input-bordered w-full" required />
      <button type="submit" className="btn btn-primary w-full">Submit Tutor</button>
    </form>
  );
}