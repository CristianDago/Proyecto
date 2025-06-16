import { useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { School, Course } from "../interface/common/enums/enums";
import { Student } from "../interface/student/student";
import { UseSchoolClassReturn } from "../interface/hooks/school.class";

const mapSchoolSlugToEnum = (slug: string): School | undefined => {
  switch (slug) {
    case "quinta-normal":
      return School.Quinta;
    case "buin":
      return School.Buin;
    case "la-granja":
      return School.Granja;
    case "nunoa":
      return School.Nunoa;
    case "pudahuel":
      return School.Pudahuel;
    case "san-miguel":
      return School.Miguel;
    default:
      return undefined;
  }
};

const mapCourseSlugToEnum = (slug: string): Course | undefined => {
  switch (slug) {
    case "1nb":
      return Course.NB1;
    case "2nb":
      return Course.NB2;
    case "3nb":
      return Course.NB3;
    case "1nm":
      return Course.NM1;
    case "2nm":
      return Course.NM2;
    default:
      return undefined;
  }
};

export function useSchoolClass(): UseSchoolClassReturn {
  const { school, course } = useParams<{ school: string; course: string }>();

  const currentSchoolEnum = useMemo(() => {
    const mapped = school ? mapSchoolSlugToEnum(school) : undefined;
    return mapped;
  }, [school]);

  const currentCourseEnum = useMemo(() => {
    const mapped = course ? mapCourseSlugToEnum(course) : undefined;
    return mapped;
  }, [course]);
  const normalizedSchool = useMemo(() => {
    const displayValue = currentSchoolEnum || school || "Colegio Desconocido";
    return displayValue;
  }, [currentSchoolEnum, school]);

  const normalizedCourse = useMemo(() => {
    const displayValue = currentCourseEnum || course || "Curso Desconocido";
    return displayValue;
  }, [currentCourseEnum, course]);

  const getFilteredStudentsBySchoolAndCourse = useCallback(
    (allStudents: Student[]): Student[] => {
      if (!currentSchoolEnum || !currentCourseEnum || !allStudents) {
        return [];
      }
      return allStudents.filter(
        (student) =>
          student.school === currentSchoolEnum &&
          student.course === currentCourseEnum
      );
    },
    [currentSchoolEnum, currentCourseEnum]
  );

  return {
    normalizedSchool,
    normalizedCourse,
    getFilteredStudentsBySchoolAndCourse,
  };
}
