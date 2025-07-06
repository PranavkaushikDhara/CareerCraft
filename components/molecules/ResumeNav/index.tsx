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
  console.log(pathname);
  return (
    <div className="hidden md:flex md:flex-col md:w-[200px] md:h-full justify-between border-r border-black">
      <div className="flex flex-col gap-2 h-full">
        {topElements.map((element) => (
          <ButtonLink
            key={element.title}
            text={element.title}
            icon={element.icon}
            href={element.href}
          />
        ))}
      </div>
      
      <div></div>
    </div>
  );
};

export default ResumeNav;
