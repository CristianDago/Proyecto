// src/components/statistics/SourceFilter.tsx
import { Student } from "../../../interface/student/stundent";
import { SourceFilterProps } from "../../../interface/common/statistics";

export const SourceFilter = ({
  students,
  source,
}: SourceFilterProps): Student[] => {
  return students.filter((student) => student.source === source);
};
