"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { usePathname, useRouter } from "next/navigation";
import { FaMoon, FaSun, FaBars } from "react-icons/fa"; 
import { useSession, signOut } from "@/lib/auth-client"; 

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const { data: session } = useSession(); 
  const user = session?.user; 
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };


  const handleHomeClick = (e) => {
    if (pathname === "/") {
      e.preventDefault(); 
      window.scrollTo({
        top: 0,
        behavior: "smooth", 
      });
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md md:px-8 sticky top-0 z-50">
      <div className="navbar-start">

        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-lg">
            <FaBars />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold border">
            <li><Link href="/" onClick={handleHomeClick}>Home</Link></li>
            <li><Link href="/tutors">Tutors</Link></li>
            {user && (
              <>
                <li><Link href="/add-tutor">Add Tutor</Link></li>
                <li><Link href="/my-tutors">My Tutors</Link></li>
                <li><Link href="/my-bookings">My Booked Sessions</Link></li>
              </>
            )}
          </ul>
        </div>

        <Link 
          href="/" 
          onClick={handleHomeClick} 
          className="btn btn-ghost text-xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text"
        >
          MediQueue
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-1">
          <li><Link href="/" onClick={handleHomeClick}>Home</Link></li>
          <li><Link href="/tutors">Tutors</Link></li>
          {user && (
            <>
              <li><Link href="/add-tutor">Add Tutor</Link></li>
              <li><Link href="/my-tutors">My Tutors</Link></li>
              <li><Link href="/my-bookings">My Booked Sessions</Link></li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl">
          {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-400" />}
        </button>

        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                <img alt="User" src={user?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-56 border">
              <li className="px-4 py-2 font-bold text-xs">
                Logged in as: <br /> <span className="text-sm">{user?.name}</span>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={() => signOut()} 
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary rounded-xl px-6">Login</Link>
        )}
      </div>
    </div>
  );
}