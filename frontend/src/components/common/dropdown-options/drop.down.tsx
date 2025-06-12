import React from "react";
import { useNavigate } from "react-router-dom";
import css from "../../sidebar/sidebar.module.scss";
import { DropdownProps } from "../../../interface/sidebar/document.drop.down";

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const navigate = useNavigate();
  return (
    <ul className={css.dropdownMenu}>
      {options.map((option, index) => (
        <li key={index} onClick={() => navigate(option.path)}>
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
