"use client";
import { redirect, usePathname } from "next/navigation";
import ButtonLink from "@/components/atoms/ButtonLink";
import React from "react";
import { FaTools } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { FaRegFlag } from "react-icons/fa";
import { FaMagic } from "react-icons/fa";
import { LuFileBadge } from "react-icons/lu";
import { RiBookShelfLine } from "react-icons/ri";
import { MdOutlinePreview } from "react-icons/md";

const topElements = [
  { title: "Contact", icon: <IoIosContact />, href: "/contact" },
  { title: "Experience", icon: <FaTools />, href: "/experience" },
  { title: "Education", icon: <RiBookShelfLine />, href: "/education" },
  { title: "Certifications", icon: <LuFileBadge />, href: "/certifications" },
  { title: "Skills", icon: <FaMagic />, href: "/skills" },
  { title: "Summary", href: "/summary", icon: <FaRegFlag /> },
  { title: "Preview", href: "/preview", icon: <MdOutlinePreview /> },
];

const ResumeNav = () => {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  console.log(
    "Available routes:",
    topElements.map(el => el.href)
  );

  return (
    <div className="hidden md:flex md:flex-col md:w-[200px] md:h-full border-r border-gray-700 bg-CareerCraftBackground shadow-lg">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/20">
        <h2 className="text-lg font-bold text-CareerCraftWhite">
          Resume Builder
        </h2>
        <p className="text-xs text-CareerCraftText mt-1">Build your resume</p>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-1 p-2 flex-1">
        {topElements.map(element => {
          const isActive = pathname === element.href;
          console.log(
            `Route ${element.href}: ${isActive ? "ACTIVE" : "inactive"}`
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

export default ResumeNav;
