"use client";
import { useSession } from "@/lib/auth-client";
import { toast } from 'react-toastify';

export default function AddTutorPage() {
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const tutorData = {
      tutorName: data.tutorName,
      photo: data.photo,
      subject: data.subject,
      availableDays: data.availableDays.split(',').map(day => day.trim()),
      timeSlot: data.timeSlot,
      hourlyFee: parseFloat(data.hourlyFee),
      totalSlot: parseInt(data.totalSlot),
      sessionDate: data.sessionDate, 
      institution: data.institution,
      experience: data.experience,
      location: data.location,
      teachingMode: data.teachingMode,
      userEmail: session?.user?.email,
    };

    try {
      const res = await fetch("http://localhost:8000/tutors", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(tutorData),
      });

      if (res.ok) {
        toast.success("Tutor added successfully!");
        form.reset();
      } else {
        toast.error("Failed to add tutor.");
      }
    } catch (error) {
      toast.error("Error occurred. Check your connection.");
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Add a Tutor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-base-200 p-8 rounded-xl shadow-lg">
        
        <input name="tutorName" placeholder="Tutor Name" className="input input-bordered w-full" required />
        <input name="photo" placeholder="Photo URL" className="input input-bordered w-full" required />
        
        <select name="subject" className="select select-bordered w-full bg-base-100 text-base-content" required>
        <option value="" className="text-gray-500">Select Subject</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="English">English Language</option>
        <option value="Computer">Computer Science</option>
        <option value="Statistics">Statistics</option>
        <option value="Statistics">Statistics</option>
        <option value="Astronomy">Astronomy</option>
        <option value="Biochemistry">Biochemistry</option>
        <option value="Web Development">Web Development</option>
        <option value="Economics">Economics</option>
        <option value="Genetics">Genetics</option>
        <option value="Accounting">Accounting</option>
        <option value="Political Science">Political Science</option>
        <option value="World History">World History</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="availableDays" placeholder="Available Days (e.g. Sun,Mon,Tue)" className="input input-bordered w-full" required />
            <input name="timeSlot" placeholder="Time Slot (e.g. 5:00 PM - 8:00 PM)" className="input input-bordered w-full" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="hourlyFee" type="number" placeholder="Hourly Fee" className="input input-bordered w-full" required />
            <input name="totalSlot" type="number" placeholder="Total Slot" className="input input-bordered w-full" required />
        </div>

        <input name="sessionDate" type="date" className="input input-bordered w-full" required />
        <input name="institution" placeholder="Institution" className="input input-bordered w-full" required />
        <textarea name="experience" placeholder="Experience" className="textarea textarea-bordered w-full" required />
        <input name="location" placeholder="Location (Area/City)" className="input input-bordered w-full" required />
        
        <select name="teachingMode" className="select select-bordered w-full" required>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>

        <button type="submit" className="btn btn-primary w-full text-lg mt-4">Submit Tutor</button>
      </form>
    </div>
  );
}