import React from "react";

interface CardProps {
  icon: any;
  title: string;
  text: string;
}
const Card = (props: CardProps) => {
  return (
    <div className="flex flex-col items-start gap-2 bg-CareerCraftBackground p-4 rounded-md w-full md:max-w-[250px] min-h-[150px]">
      <span className="text-CareerCraftPrimary">{props.icon}</span>
      <span className="text-md font-semibold capitalize text-CareerCraftWhite">
        {props.title}
      </span>
      <p className="text-sm text-CareerCraftText">{props.text}</p>
    </div>
  );
};

export default Card;
