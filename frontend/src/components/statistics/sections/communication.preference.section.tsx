import React from "react";
import { BarChart } from "../layouts/bar.chart";
import { CommunicationPreferenceSectionProps } from "../../../interface/common/statistics/sections";

export const CommunicationPreferenceSection: React.FC<CommunicationPreferenceSectionProps> =
  React.memo(({ filteredStatistics }) => {
    const data = [
      { name: "WhatsApp", value: filteredStatistics.whatsappCount },
      { name: "Teléfono", value: filteredStatistics.phoneCount },
      {
        name: "No registrada",
        value: filteredStatistics.noRegisteredCommunication,
      },
    ];

    return (
      <div className="modulos">
        <h2>Preferencia de comunicación</h2>
        <BarChart data={data} title="Preferencia de comunicación" />
      </div>
    );
  });
