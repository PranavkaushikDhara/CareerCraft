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

export default SideNav;
