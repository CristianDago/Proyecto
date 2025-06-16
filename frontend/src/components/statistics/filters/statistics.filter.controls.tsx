import React from "react";
import { Source, School, Course } from "../../../interface/common/enums/enums";
import Constants from "../../../utils/constants";
import { StatisticsFilterControlsProps } from "../../../interface/common/statistics/statistics.filter.control";

export const StatisticsFilterControls: React.FC<
  StatisticsFilterControlsProps
> = ({ selectedSource, selectedSchool, selectedCourse, onFilterChange }) => {
  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Source | "";
    onFilterChange({ source: value === "" ? null : value });
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as School | "";
    onFilterChange({ school: value === "" ? null : value });
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Course | "";
    onFilterChange({ course: value === "" ? null : value });
  };

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
      <select value={selectedSource || ""} onChange={handleSourceChange}>
        <option value="">Todas las Fuentes</option>
        {Constants.SOURCE_OPTIONS.filter((option) => option !== "").map(
          (src) => (
            <option key={src} value={src}>
              {src}
            </option>
          )
        )}
      </select>

      <select value={selectedSchool || ""} onChange={handleSchoolChange}>
        <option value="">Todos los Colegios</option>
        {Constants.SCHOOL_OPTIONS.filter((option) => option !== "").map(
          (sch) => (
            <option key={sch} value={sch}>
              {sch}
            </option>
          )
        )}
      </select>

      <select value={selectedCourse || ""} onChange={handleCourseChange}>
        <option value="">Todos los Cursos</option>
        {Constants.COURSE_OPTIONS.filter((option) => option !== "").map(
          (crs) => (
            <option key={crs} value={crs}>
              {crs}
            </option>
          )
        )}
      </select>
    </div>
  );
};
