// src/components/statistics/filters/statistics.filter.controls.tsx
import React from 'react';
import { Source, School, Course } from '../../../interface/student/student'; // Importa los enums

// Define las props que este componente aceptará
interface StatisticsFilterControlsProps {
  // Los valores actuales de los filtros, recibidos desde el componente padre
  selectedSource: Source | null;
  selectedSchool: School | null;
  selectedCourse: Course | null;
  // La función que el componente padre pasará para actualizar sus estados de filtro
  onFilterChange: (filters: {
    source?: Source | null;
    school?: School | null;
    course?: Course | null;
  }) => void;
}

export const StatisticsFilterControls: React.FC<StatisticsFilterControlsProps> = ({
  selectedSource,
  selectedSchool,
  selectedCourse,
  onFilterChange,
}) => {
  // Manejador para el cambio de fuente
  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Source | ''; // Puede ser un valor del enum o una cadena vacía
    onFilterChange({ source: value === '' ? null : value });
  };

  // Manejador para el cambio de colegio
  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as School | ''; // Puede ser un valor del enum o una cadena vacía
    onFilterChange({ school: value === '' ? null : value });
  };

  // Manejador para el cambio de curso
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Course | ''; // Puede ser un valor del enum o una cadena vacía
    onFilterChange({ course: value === '' ? null : value });
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
      {/* Selector de Fuente */}
      <select value={selectedSource || ''} onChange={handleSourceChange}>
        <option value="">Todas las Fuentes</option>
        {Object.values(Source).map((src) => (
          <option key={src} value={src}>
            {src}
          </option>
        ))}
      </select>

      {/* Selector de Colegio */}
      <select value={selectedSchool || ''} onChange={handleSchoolChange}>
        <option value="">Todos los Colegios</option>
        {Object.values(School).map((sch) => (
          <option key={sch} value={sch}>
            {sch}
          </option>
        ))}
      </select>

      {/* Selector de Curso */}
      <select value={selectedCourse || ''} onChange={handleCourseChange}>
        <option value="">Todos los Cursos</option>
        {Object.values(Course).map((crs) => (
          <option key={crs} value={crs}>
            {crs}
          </option>
        ))}
      </select>
    </div>
  );
};