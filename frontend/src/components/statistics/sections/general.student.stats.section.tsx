// src/components/statistics/sections/GeneralStudentStatsSection.tsx
import React from 'react';
import { Table } from '../layouts/table'; // Asume que la ruta es correcta
import { FilteredStatistics } from '../../../interface/common/statistics'; // Importa la interfaz

interface GeneralStudentStatsSectionProps {
  filteredStatistics: FilteredStatistics;
  allFeedbacks: string[]; // Recibe todos los feedbacks posibles para normalizar los datos
}

export const GeneralStudentStatsSection: React.FC<GeneralStudentStatsSectionProps> = React.memo(({
  filteredStatistics,
  allFeedbacks,
}) => {
  const tableData = allFeedbacks.map((feedback) => {
    const count = filteredStatistics.studentsByGeneralState.find(
      (item) => item.estado === feedback
    )?.cantidad;

    return {
      Estado: feedback,
      Estudiantes: count || 0,
    };
  });

  return (
    <div className="modulos"> {/* Usaremos el className de css.modulos */}
      <h2>Estado general de los estudiantes</h2>
      <Table data={tableData} columns={["Estado", "Estudiantes"]} />
    </div>
  );
});