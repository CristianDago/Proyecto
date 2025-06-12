import React, { useState, useMemo } from "react";
import { useAuth } from "../auth/auth.context";
import { useNavigate } from "react-router-dom";
import css from "../../assets/styles/components/sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHouse,
  faChartPie,
  faGraduationCap,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo-escuelas-blanco.png";

import { generateCourseOptions } from "../../utils/navigation.options";
import Constants from "../../utils/constants";

import DropdownOptions from "../common/dropdown-options/drop.down.options";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const dropdownItems = useMemo(
    () => [
      {
        label: "Quinta normal",
        options: generateCourseOptions("quinta-normal"),
      },
      { label: "Buín", options: generateCourseOptions("buin") },
      { label: "La Granja", options: generateCourseOptions("la-granja") },
      { label: "Ñuñoa", options: generateCourseOptions("nunoa") },
      { label: "Pudahuel", options: generateCourseOptions("pudahuel") },
      { label: "San Miguel", options: generateCourseOptions("san-miguel") },
    ],
    []
  );

  const handleDropdownClick = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <button className={css.menuButton} onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      <div className={`${css.sidebar} ${isMenuOpen ? css.open : ""}`}>
        <img src={logo} alt="logo" className={css.logo} />
        <h3>Principal</h3>
        <ul>
          <li onClick={() => handleItemClick("/dashboard")}>
            <FontAwesomeIcon icon={faHouse} className={css.icons} /> Dashboard
          </li>
          <li onClick={() => handleItemClick("/dashboard/add-student")}>
            <FontAwesomeIcon icon={faGraduationCap} className={css.icons} />
            Agregar estudiante
          </li>
          <li onClick={() => handleItemClick("/dashboard/estadisticas")}>
            <FontAwesomeIcon icon={faChartPie} className={css.icons} />
            Estadísticas
          </li>
        </ul>

        <h3>Colegios</h3>
        <ul>
          {dropdownItems.map((item) => (
            <li
              key={item.label}
              className={`${css.dropdownContainer} ${
                activeDropdown === item.label ? css.open : ""
              }`}
              onClick={() => handleDropdownClick(item.label)}
            >
              <div className={css.dropdownToggle}>
                <FontAwesomeIcon icon={faSchool} className={css.icons} />
                <span>{item.label}</span>
              </div>

              <DropdownOptions
                options={item.options}
                className={css.dropdownMenu}
                style={{
                  height:
                    activeDropdown === item.label
                      ? `${
                          item.options.length *
                          Constants.DROPDOWN_ITEM_HEIGHT_PX
                        }px`
                      : "0",
                  overflow: "hidden",
                }}
              />
            </li>
          ))}
        </ul>

        <button onClick={handleLogout}>Salir</button>
      </div>
    </>
  );
};

export default Sidebar;
