// src/components/statistics/CourseFilter.tsx
import { Student } from "../../../interface/student/stundent";
import { CourseFilterProps } from "../../../interface/common/statistics";

export const CourseFilter = ({
  students,
  course,
}: CourseFilterProps): Student[] => {
  return students.filter((student) => student.course === course);
};
