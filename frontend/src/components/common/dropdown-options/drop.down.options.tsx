import React from "react";
import { useNavigate } from "react-router-dom";
import { DropdownOptionsProps } from "../../../interface/common/dropdown-options/document.dropdown";

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
