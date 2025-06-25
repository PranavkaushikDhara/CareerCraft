import clsx from "clsx";
import React from "react";

interface InputProps {
  placeholder: string;
  icon?: React.ReactNode;
  name: string;
  type?: string;
  className?: string;
  required: boolean;
  disabled?: boolean;
  value?: string;
  label?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = (props: InputProps) => {
  return (
    <input
      className={clsx(
        "bg-CareerCraftBackground text-CareerCraftText p-2 text-sm outline-none focus:ring-2 focus:ring-CareerCraftPrimary [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:hover:opacity-70",
        props.className
      )}
      onKeyDown={props.onKeyDown}
      required={props.required}
      disabled={props.disabled}
      name={props.name}
      onChange={props.onChange}
      defaultValue={props.value}
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
    />
  );
};

export const TextArea = (props: InputProps) => {
  return (
    <textarea
      className={clsx(
        "w-full p-2 rounded-md shadow-sm text-sm bg-CareerCraftBackground focus:ring-2  focus:ring-CareerCraftPrimaryDark outline-none",
        props.className
      )}
      name={props.name}
      defaultValue={props.value}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
