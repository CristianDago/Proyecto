import React from "react";
import { BarChart } from "../layouts/bar.chart";
import { FilteredStatistics } from "../../../interface/common/statistics";

interface GenderDistributionSectionProps {
  filteredStatistics: FilteredStatistics;
}

export const GenderDistributionSection: React.FC<GenderDistributionSectionProps> =
  React.memo(({ filteredStatistics }) => {
    const data = [
      { name: "Hombres", value: filteredStatistics.genderCount.hombres },
      { name: "Mujeres", value: filteredStatistics.genderCount.mujeres },
      { name: "Otros", value: filteredStatistics.genderCount.otros },
      {
        name: "No registrado",
        value: filteredStatistics.genderCount.noContesta,
      },
    ];

    return (
      <div className="modulos">
        <h2>Distribución por Género</h2>
        <BarChart data={data} title="Distribución por Género" />
      </div>
    );
  });
