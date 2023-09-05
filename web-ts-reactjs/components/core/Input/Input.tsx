import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  name: string;
  className: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
