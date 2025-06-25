"use client";
import React from "react";
import Link from "next/link";
interface ButtonLinkProps {
  text: string;
  icon?: any;
  href: string;
  class?: string;
  type?: any;
  front?: boolean;
}
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const ButonLinkSecondary = (props: ButtonLinkProps) => {
  return (
    <button
      type={props.type}
      className={clsx(
        "text-CareerCraftWhite p-2 text-sm  rounded-md",
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
  return (
    <button
      className={clsx(
        "text-CareerCraftWhite p-2 text-sm hover:bg-CareerCraftForeGroundLight rounded-md",
        {
          "bg-CareerCraftPrimary hover:bg-CareerCraftPrimaryDark":
            pathname === props.href,
        },
        props.class
      )}
    >
      <Link href={props.href} className="flex gap-2 items-center">
        {props.icon}
        {props.text}
      </Link>
    </button>
  );
};

export default ButtonLink;
