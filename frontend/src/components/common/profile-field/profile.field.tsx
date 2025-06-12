import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import css from "../../../assets/styles/layout/student.profile.module.scss";

interface ProfileFieldProps {
  icon: IconDefinition;
  label: string;
  value: string | number | null | undefined;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ icon, label, value }) => (
  <li>
    <FontAwesomeIcon icon={icon} className={css.profileIcon} />{" "}
    <strong>{label}:</strong> {value || "NO REGISTRADO"}
  </li>
);

export default ProfileField;
