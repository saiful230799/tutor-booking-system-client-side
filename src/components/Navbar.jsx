"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  
  const [user, setUser] = useState(null); 

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

  return (
    <div className="navbar bg-base-100 shadow-md md:px-8 sticky top-0 z-50">
      

      <div className="navbar-start">

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
            <li><Link href="/">Home</Link></li>
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
        
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary tracking-wide">
          MediQueue
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-1">
          <li><Link href="/">Home</Link></li>
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
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl transition-transform duration-300 active:scale-95">
          {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-400" />}
        </button>

        {user ? (

          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  alt="User Profile" 
                  src={user?.photoURL || "https://i.ibb.co.com/vksy7zm/tutor1.jpg"} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-200">
              <li className="px-4 py-2 font-bold text-xs text-gray-400 select-none">
                Logged in as: <br />
                <span className="text-base-content text-sm">{user?.displayName || "Saiful Islam"}</span>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={() => setUser(null)} 
                  className="text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm md:btn-md rounded-xl font-bold px-6 shadow-md hover:scale-105 transition-all">
            Login
          </Link>
        )}
      </div>

    </div>
  );
}