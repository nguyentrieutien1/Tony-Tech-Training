import React, { FormEvent } from "react";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  className: string;
  type: any;
  onClick?: (e: FormEvent<Element> | any) => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className,
  type,
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
