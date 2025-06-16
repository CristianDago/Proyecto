import { Student } from "../../../interface/student/student";
import { SourceFilterProps } from "../../../interface/common/statistics/statistics";

export const SourceFilter = ({
  students,
  source,
}: SourceFilterProps): Student[] => {
  return students.filter((student) => student.source === source);
};
