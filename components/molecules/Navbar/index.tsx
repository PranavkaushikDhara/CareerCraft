"use client";
import PrimaryButton, { SecondaryButton } from "../../atoms/Button";
import CustomLink from "../../atoms/Link";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";

const Navbar = () => {
  const [currentUser, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      console.log("Auth state changed:", user);
      console.log("User displayName:", user?.displayName);
      console.log("User email:", user?.email);
      if (user) {
        setUser(user.displayName || user.email);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      redirect("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-between items-center border-b border-black bg-CareerCraftBackground bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/40 px-2 w-full max-w-full overflow-hidden">
        <GiHamburgerMenu className="md:hidden text-CareerCraftWhite flex-shrink-0" />
        <Link href="/" className="flex-shrink-0">
          <Image alt="logo" src="/logo.png" height={30} width={30} />
        </Link>
        <div className="text-CareerCraftWhite flex-shrink-0">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-b border-black bg-CareerCraftBackground bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/40 px-2 w-full max-w-full overflow-hidden">
      <GiHamburgerMenu className="md:hidden text-CareerCraftWhite flex-shrink-0" />
      <Link href="/" className="flex-shrink-0">
        <Image alt="logo" src="/logo.png" height={50} width={50} />
      </Link>

      {currentUser ? (
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <span className="text-CareerCraftWhite text-sm truncate max-w-32 md:max-w-none">
            Welcome, {currentUser}
          </span>
          <PrimaryButton text="Logout" onClickMethod={handleLogout} />
        </div>
      ) : (
        <div className="flex gap-2 md:gap-4 flex-shrink-0">
          <SecondaryButton
            text="Sign In"
            onClickMethod={() => redirect("/login")}
            className="text-CareerCraftWhite hover:bg-CareerCraftPrimaryDark border border-CareerCraftPrimary"
          />
          <PrimaryButton
            text="Join Us"
            onClickMethod={() => redirect("/register")}
          />
        </div>
      )}
    </div>
  );
};

export const GenericNavbar = () => {
  const [currentUser, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      console.log("GenericNavbar Auth state changed:", user);
      console.log("User displayName:", user?.displayName);
      console.log("User email:", user?.email);
      if (user) {
        setUser(user.displayName || user.email);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      redirect("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden border-b border-black bg-CareerCraftBackground bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/40">
      <div className="flex justify-between items-center px-2 py-2">
        {/* Mobile hamburger and logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <GiHamburgerMenu className="md:hidden text-CareerCraftWhite" />
          <Link href="/">
            <Image alt="logo" src="/logo.png" height={50} width={50} />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-4 flex-shrink-0">
          <CustomLink text="Features" href="/" />
          <CustomLink text="Pricing" href="/" />
          <CustomLink text="Resources" href="/" />
        </div>

        {/* Auth section */}
        {currentUser ? (
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <span className="text-CareerCraftWhite text-sm truncate max-w-32 md:max-w-none">
              Welcome, {currentUser}
            </span>
            <PrimaryButton text="Logout" onClickMethod={handleLogout} />
          </div>
        ) : (
          <div className="flex gap-2 md:gap-4 flex-shrink-0">
            <SecondaryButton
              text="Sign In"
              onClickMethod={() => redirect("/login")}
              className="text-CareerCraftWhite hover:bg-CareerCraftPrimaryDark border border-CareerCraftPrimary"
            />
            <PrimaryButton
              text="Join Us"
              onClickMethod={() => redirect("/register")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
