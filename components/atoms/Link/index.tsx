import Link from "next/link";
import React from "react";

interface LinkProps {
  text: string;
  href: string;
  className?: string;
}

const CustomLink = (props: LinkProps) => {
  const defaultClasses =
    "text-CareerCraftText hover:text-CareerCraftPrimary text-sm";
  const combinedClasses = props.className
    ? `${defaultClasses} ${props.className}`
    : defaultClasses;

  return (
    <Link href={props.href} className={combinedClasses}>
      {props.text}
    </Link>
  );
};

export default CustomLink;
