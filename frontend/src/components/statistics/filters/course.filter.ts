import { Student } from "../../../interface/student/student";
import { CourseFilterProps } from "../../../interface/common/statistics";

export const CourseFilter = ({
  students,
  course,
}: CourseFilterProps): Student[] => {
  return students.filter((student) => student.course === course);
};
