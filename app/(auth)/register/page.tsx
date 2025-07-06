"use client";

import { useState } from "react";
import PrimaryButton from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";

const Register = () => {
  const router = useRouter(); // Router for navigation
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.firstname,
        });
      }
      console.log(userCredential);
      router.push("/login");
    } catch (error: any) {
      switch (error.code) {
        case "auth/password-does-not-meet-requirements":
          setError(
            "Your password must include at least one number, one uppercase letter, one lowercase letter, and satisfy our security standards."
          );
          break;
        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists. Please try logging in instead."
          );
          break;
        default:
          setError("Something went wrong!!");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full md:flex-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-CareerCraftPrimary/10 bg-CareerCraftBackground p-8 rounded-lg shadow-lg w-full"
      >
        <div className="flex flex-col gap-2 items-center">
          <span className="text-CareerCraftWhite font-bold text-2xl">
            Create Account
          </span>
          <span className="text-CareerCraftText text-sm">
            Join us today and start your journey
          </span>
        </div>

        {/* First Name */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="firstname"
          >
            First Name
          </label>
          <Input
            required
            className="rounded-md text-CareerCraftInputText"
            placeholder="Enter your first name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <Input
            required
            className="rounded-md text-CareerCraftInputText"
            placeholder="Enter your last name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="email"
          >
            Email Address
          </label>
          <Input
            required
            className="rounded-md text-CareerCraftInputText"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            required
            className="rounded-md text-CareerCraftInputText"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-CareerCraftWhite text-sm font-medium"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <Input
            required
            className="rounded-md text-CareerCraftInputText"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Terms & Conditions */}
        <span className="flex gap-2 text-sm text-CareerCraftText items-center">
          <input type="checkbox" required />
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </span>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <PrimaryButton
            type="submit"
            text={loading ? "Registering..." : "Register"}
          />
        </div>

        {/* Login Link */}
        <span className="text-CareerCraftText text-sm gap-1 flex justify-center">
          Already have an account?
          <Link className="text-CareerCraftPrimary" href="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
