"use client";
import { usePathname } from "next/navigation";
import ButtonLink from "@/components/atoms/ButtonLink";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { HiSpeakerphone } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";

const topElements = [
  { title: "Dashboard", icon: <FaMicrophone />, href: "/dashboard" },
  { title: "Resumes", icon: <IoDocumentText />, href: "/resumes" },
  { title: "Elevator Pitch", icon: <HiSpeakerphone />, href: "/pitch" },
  { title: "LinkedIn Optimization", icon: <FaLinkedin />, href: "/linkedin" },
  { title: "Email Writer", icon: <IoMdMail />, href: "/email" },
  { title: "Profile", href: "/profile", icon: <FaUserAlt /> },
];

const SideNav = () => {
  const pathname = usePathname();
  console.log("Dashboard pathname:", pathname);
  console.log(
    "Available dashboard routes:",
    topElements.map(el => el.href)
  );

  return (
    <div className="hidden md:flex md:flex-col md:w-[200px] md:h-full border-r border-gray-700 bg-CareerCraftBackground shadow-lg">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/20">
        <h2 className="text-lg font-bold text-CareerCraftWhite">
          Career Tools
        </h2>
        <p className="text-xs text-CareerCraftText mt-1">
          Navigate your career
        </p>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-1 p-2 flex-1">
        {topElements.map(element => {
          const isActive = pathname === element.href;
          console.log(
            `Dashboard route ${element.href}: ${isActive ? "ACTIVE" : "inactive"}`
          );
          return (
            <ButtonLink
              key={element.title}
              text={element.title}
              icon={element.icon}
              href={element.href}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
