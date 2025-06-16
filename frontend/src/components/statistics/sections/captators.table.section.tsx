import React from "react";
import { Table } from "../layouts/table";
import { CaptatorsTableSectionProps } from "../../../interface/common/statistics/sections";

export const CaptatorsTableSection: React.FC<CaptatorsTableSectionProps> =
  React.memo(({ filteredStatistics }) => {
    return (
      <div className="modulos">
        <h2>Captadores</h2>
        <Table
          data={filteredStatistics.contactsByPerson}
          columns={["Captador", "Contacto"]}
        />
      </div>
    );
  });
