
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config"; // Adjust if needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (!res || !res.user) {
        setError("User does not exist or credentials are invalid.");
        return;
      }
      toast.success("Login successful!", {
                position: "bottom-right",
                autoClose: 2000,
                theme: "dark",
              });
      console.log("Login successful:", res);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      setTimeout(() => {
        
          router.push("/Home");
      }, 2000);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
       toast.error("Login error!", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "dark",
            });
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 animate-gradient-x text-gray-800">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-700 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        {firebaseError && (
          <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">
            {firebaseError.message}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={email}
                maxLength={50}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-600 font-medium">Password</label>
            <input
              type="password"
              value={password}
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
   </>
  );
}
