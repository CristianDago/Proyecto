// src/components/statistics/StudentFilters.tsx
import { StudentFiltersProps } from "../../../interface/common/statistics";

import { Student } from "../../../interface/student/stundent";
import { SourceFilter } from "./SourceFilter";
import { SchoolFilter } from "./SchoolFilter";
import { CourseFilter } from "./CourseFilter";

export const StudentFilters = ({
  students,
  sourceFilter,
  schoolFilter,
  courseFilter,
}: StudentFiltersProps): Student[] => {
  let filteredStudents = students;

  if (sourceFilter) {
    filteredStudents = SourceFilter({
      students: filteredStudents,
      source: sourceFilter,
    });
  }

  if (schoolFilter) {
    filteredStudents = SchoolFilter({
      students: filteredStudents,
      school: schoolFilter,
    });
  }

  if (courseFilter) {
    filteredStudents = CourseFilter({
      students: filteredStudents,
      course: courseFilter,
    });
  }

  return filteredStudents;
};
