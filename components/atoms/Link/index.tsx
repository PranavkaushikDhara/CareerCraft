import Link from "next/link";
import React from "react";

interface LinkProps {
  text: string;
  href: string;
}
const CustomLink = (props: LinkProps) => {
  return (
    <Link
      href={props.href}
      className="text-CareerCraftText hover:text-CareerCraftPrimary text-sm"
    >
      {props.text}
    </Link>
  );
};

export default CustomLink;
