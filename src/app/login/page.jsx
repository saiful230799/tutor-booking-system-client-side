"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const { data, error: authError } = await signIn.email({
      email,
      password,
      callbackURL: "/" 
    });

    if (authError) {
      setLoading(false);
      setError(authError.message || "Invalid email or password!");
    } else {
      fetch('http://localhost:8000/jwt', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: email })
      })
      .then(res => res.json())
      .then(result => {
          if(result.success) {
              console.log("JWT Token generated and cookie set!");
              router.push("/");
          }
      })
      .catch(err => {
          console.error("JWT Error:", err);
          setLoading(false);
      });
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    await signIn.social({
      provider: "google",
      callbackURL: "/"
    });
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
          <h2 className="text-3xl font-extrabold text-base-content">Welcome Back</h2>
          <p className="text-sm text-gray-500">Log in to book your favorite university mentor</p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {error && (
          <div className="alert alert-error text-sm py-2 rounded-xl text-white font-medium">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input type="email" name="email" placeholder="enter your email" className="input input-bordered w-full pl-4 bg-base-200 focus:input-primary" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full pl-4 bg-base-200 focus:input-primary" required />
          </div>

          <button type="submit" disabled={loading} className="w-full text-white font-bold rounded-xl mt-2 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 disabled:opacity-50">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 uppercase tracking-wider">or continue with</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center justify-center gap-2">
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link href="/register" className="text-purple-600 font-bold hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
}