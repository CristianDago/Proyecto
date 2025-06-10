import React from "react";
import InputFieldProps from "../../../interface/common/inputField";

interface Props extends InputFieldProps {
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export const InputField: React.FC<Props> = ({
  id,
  label,
  type,
  value,
  onChange,
  className,
  placeholder,
  required,
}) => (
  <div className={className}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);
