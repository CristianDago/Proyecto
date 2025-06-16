import { Student } from "../../../interface/student/student";
import { SchoolFilterProps } from "../../../interface/common/statistics/statistics";

export const SchoolFilter = ({
  students,
  school,
}: SchoolFilterProps): Student[] => {
  return students.filter((student) => student.school === school);
};
