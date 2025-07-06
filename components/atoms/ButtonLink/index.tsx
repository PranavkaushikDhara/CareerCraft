"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface ButtonLinkProps {
  text: string;
  icon?: any;
  href: string;
  class?: string;
  type?: any;
  front?: boolean;
}

export const ButonLinkSecondary = (props: ButtonLinkProps) => {
  return (
    <button
      type={props.type}
      className={clsx(
        "text-CareerCraftWhite p-2 text-sm rounded-md",
        props.class
      )}
    >
      <Link href={props.href} className="flex gap-2 items-center">
        {props.front ? (
          <>
            {props.text}
            {props.icon}
          </>
        ) : (
          <>
            {props.icon}
            {props.text}
          </>
        )}
      </Link>
    </button>
  );
};

export const ButtonLink = (props: ButtonLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      href={props.href}
      className={clsx(
        "flex gap-2 items-center text-CareerCraftWhite p-3 text-sm rounded-md transition-all duration-200 w-full group",
        {
          "bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark shadow-md":
            isActive,
          "hover:bg-CareerCraftForeGroundLight hover:shadow-sm": !isActive,
        },
        props.class
      )}
    >
      <span
        className={clsx("transition-transform duration-200", {
          "group-hover:scale-110": !isActive,
          "scale-110": isActive,
        })}
      >
        {props.icon}
      </span>
      <span
        className={clsx("font-medium", {
          "text-CareerCraftWhite": isActive,
          "text-CareerCraftText group-hover:text-CareerCraftWhite": !isActive,
        })}
      >
        {props.text}
      </span>
    </Link>
  );
};

export default ButtonLink;
