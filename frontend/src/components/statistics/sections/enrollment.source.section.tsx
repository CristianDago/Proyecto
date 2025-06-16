import React from "react";
import { BarChart } from "../layouts/bar.chart";
import { EnrollmentSourceSectionProps } from "../../../interface/common/statistics/sections";

export const EnrollmentSourceSection: React.FC<EnrollmentSourceSectionProps> =
  React.memo(({ filteredStatistics }) => {
    const data = [
      {
        name: "Redes Sociales",
        value: filteredStatistics.socialMediaCount,
      },
      { name: "Captador", value: filteredStatistics.captadorCount },
      {
        name: "No registrada",
        value: filteredStatistics.noRegisteredSource,
      },
    ];

    return (
      <div className="modulos">
        <h2>Fuente de inscripción</h2>
        <BarChart data={data} title="Fuentes de Inscripción" />
      </div>
    );
  });
