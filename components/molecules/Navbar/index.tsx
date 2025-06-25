"use client";
import PrimaryButton, { SecondaryButton } from "../../atoms/Button";
import CustomLink from "../../atoms/Link";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-black bg-CareerCraftBackground bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/40 px-2 ">
      <GiHamburgerMenu className="md:hidden text-CareerCraftWhite"></GiHamburgerMenu>
      <Link href="/">
        <Image alt="logo" src="/logo.png" height={50} width={50}></Image>
      </Link>
    </div>
  );
};



export const GenericNavbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-black bg-CareerCraftBackground bg-gradient-to-r from-CareerCraftBackground to-CareerCraftPrimaryDark/40 px-2 ">
      <GiHamburgerMenu className="md:hidden text-CareerCraftWhite"></GiHamburgerMenu>
      <Link href="/">
        <Image alt="logo" src="/logo.png" height={50} width={50}></Image>
      </Link>
      <div className=" flex justify-between w-full px-4 py-2 items-center">
        {/* left side */}

        <div className="hidden md:flex gap-4 ">
          {/* <Image></Image> */}
          <CustomLink text="Features" href="/" />
          <CustomLink text="Pricing" href="/" />
          <CustomLink text="Resources" href="/" />
        </div>

        {/* right side */}
        <div className="flex gap-4 w-full justify-end">
          <SecondaryButton
            text="Sign In"
            onClickMethod={() => redirect("/sign-in")}
            className="text-CareerCraftWhite hover:bg-CareerCraftPrimaryDark border border-CareerCraftPrimary"
          />
          <PrimaryButton
            text="Join Us"
            onClickMethod={() => redirect("/sign-in")}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
