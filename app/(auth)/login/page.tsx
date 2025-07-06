"use client";

import { useState, useEffect } from "react";
import PrimaryButton from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, redirect to dashboard
        router.push("/dashboard");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      router.push("/home");
    } catch (error: any) {
      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/user-not-found":
          setError(
            "No account found with this email address. Please check your email or sign up."
          );
          break;
        case "auth/wrong-password":
          setError(
            "Incorrect password. Please try again or reset your password."
          );
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.");
          break;
        case "auth/too-many-requests":
          setError(
            "Too many failed attempts. Please try again later or reset your password."
          );
          break;
        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection and try again."
          );
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password. Please check your credentials.");
          break;
        case "auth/operation-not-allowed":
          setError(
            "Email/password sign-in is not enabled. Please contact support."
          );
          break;
        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with this email using a different sign-in method."
          );
          break;
        default:
          setError(
            "An unexpected error occurred. Please try again or contact support."
          );
          console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full md:flex-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-CareerCraftPrimary/10 p-8 rounded-lg shadow-lg w-full"
      >
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-CareerCraftWhite font-bold text-2xl">
            Welcome Back
          </h2>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="email"
          >
            Email Address
          </label>
          <Input
            className="rounded-md text-CareerCraftInputText"
            type="email"
            required
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            className="rounded-md text-CareerCraftInputText"
            type="password"
            placeholder="Enter your password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <PrimaryButton
            type="submit"
            text={loading ? "Signing In..." : "Login"}
            disabled={loading}
          />
        </div>

        {/* Signup Link */}
        <span className="text-CareerCraftText text-sm gap-1 flex justify-center">
          Don't have an account?
          <Link className="text-CareerCraftPrimary" href="/register">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
