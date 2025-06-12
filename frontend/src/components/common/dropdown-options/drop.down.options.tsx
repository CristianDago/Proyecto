import React from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

interface DropdownOption {
  label: string;
  path: string;
}

interface DropdownOptionsProps {
  options: DropdownOption[];
  className?: string;
  style?: CSSProperties;
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({
  options,
  className,
  style,
}) => {
  const navigate = useNavigate();

  return (
    <ul className={className} style={style}>
      {options.map((option) => (
        <li key={option.path} onClick={() => navigate(option.path)}>
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default DropdownOptions;
