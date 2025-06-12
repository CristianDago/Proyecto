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
    faSchool, // Icono de colegios
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo-escuelas-blanco.png";

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleLogout = () => {
        logout();
        navigate("/");
        setIsMenuOpen(false); // Cerrar el menú al hacer logout
    };

    const dropdownItems = useMemo(
        () => [
            { label: "Quinta normal", options: generateOptions("quinta-normal") },
            { label: "Buín", options: generateOptions("buin") },
            { label: "La Granja", options: generateOptions("la-granja") },
            { label: "Ñuñoa", options: generateOptions("nunoa") },
            { label: "Pudahuel", options: generateOptions("pudahuel") },
            { label: "San Miguel", options: generateOptions("san-miguel") },
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
        setIsMenuOpen(false); // Cerrar el menú al hacer clic en un item
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
                            {/* Contenedor flexible para alinear icono y texto */}
                            <div className={css.dropdownToggle}>
                                <FontAwesomeIcon icon={faSchool} className={css.icons} />
                                <span>{item.label}</span>
                            </div>
                            <ul
                                className={css.dropdownMenu}
                                style={{
                                    height:
                                        activeDropdown === item.label
                                            ? `${item.options.length * 40}px`
                                            : "0",
                                    overflow: "hidden",
                                }}
                            >
                                {item.options.map((option) => (
                                    <li key={option.path} onClick={() => handleItemClick(option.path)}>
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <button onClick={handleLogout}>Salir</button>
            </div>
        </>
    );
};

const generateOptions = (school: string) => [
    { label: "1° nivel básico", path: `/dashboard/${school}/1nb` },
    { label: "2° nivel básico", path: `/dashboard/${school}/2nb` },
    { label: "3° nivel básico", path: `/dashboard/${school}/3nb` },
    { label: "1° nivel medio", path: `/dashboard/${school}/1nm` },
    { label: "2° nivel medio", path: `/dashboard/${school}/2nm` },
];

export default Sidebar;