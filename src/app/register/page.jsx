"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    console.log("Register details:", { name, email, photoURL, password });
  };

  const handleGoogleLogin = () => {
    console.log("Google registration triggered");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center pt-28 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-base-content">Create Account</h2>
          <p className="text-sm text-gray-500">Join MediQueue to connect with top university tutors</p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="enter your name" 
              className="input input-bordered w-full pl-4 bg-base-200 focus:input-primary" 
              required 
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input 
              type="email" 
              name="email"
              placeholder="enter your email" 
              className="input input-bordered w-full pl-4 bg-base-200 focus:input-primary" 
              required 
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input 
              type="url" 
              name="photoURL"
              placeholder="https://example.com/photo.jpg" 
              className="input input-bordered w-full pl-4 bg-base-200 focus:input-primary" 
              required 
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              className="input input-bordered w-full pl-4 bg-base-200 focus:input-primary" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full text-white font-bold rounded-xl mt-4 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </form>

        <div className="divider text-xs text-gray-400 uppercase tracking-wider">or continue with</div>

        <button 
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-content hover:text-base-100 transition-colors"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}