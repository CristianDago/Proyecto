// src/components/statistics/sections/CaptatorsTableSection.tsx
import React from 'react';
import { Table } from '../layouts/table';
import { FilteredStatistics } from '../../../interface/common/statistics';

interface CaptatorsTableSectionProps {
  filteredStatistics: FilteredStatistics;
}

export const CaptatorsTableSection: React.FC<CaptatorsTableSectionProps> = React.memo(({
  filteredStatistics,
}) => {
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