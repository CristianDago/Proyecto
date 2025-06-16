import React from "react";
import { Table } from "../layouts/table";
import { GeneralStudentStatsSectionProps } from "../../../interface/common/statistics/sections";

export const GeneralStudentStatsSection: React.FC<GeneralStudentStatsSectionProps> =
  React.memo(({ filteredStatistics, allFeedbacks }) => {
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
      <div className="modulos">
        <h2>Estado general de los estudiantes</h2>
        <Table data={tableData} columns={["Estado", "Estudiantes"]} />
      </div>
    );
  });
