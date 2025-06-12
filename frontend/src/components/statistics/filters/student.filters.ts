import { StudentFiltersProps } from "../../../interface/common/statistics";

import { Student } from "../../../interface/student/student";
import { SourceFilter } from "./source.filter";
import { SchoolFilter } from "./school.filter";
import { CourseFilter } from "./course.filter";

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
