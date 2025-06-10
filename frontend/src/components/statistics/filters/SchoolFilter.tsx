// src/components/statistics/SchoolFilter.tsx
import { Student } from "../../../interface/student/stundent";
import { SchoolFilterProps } from "../../../interface/common/statistics";


export const SchoolFilter = ({
  students,
  school,
}: SchoolFilterProps): Student[] => {
  return students.filter((student) => student.school === school);
};
