// src/hooks/useSchoolClass.ts
import { useParams } from "react-router-dom";
import { Student } from "../interface/student/stundent";

export const useSchoolClass = () => {
  const { school, course } = useParams();

  const schoolMap = {
    "quinta-normal": "QUINTA NORMAL",
    buin: "BUÍN",
    "la-granja": "LA GRANJA",
    nunoa: "ÑUÑOA",
    pudahuel: "PUDAHUEL",
    "san-miguel": "SAN MIGUEL",
  };

  const courseMap = {
    "1nb": "1° NIVEL BÁSICO",
    "2nb": "2° NIVEL BÁSICO",
    "3nb": "3° NIVEL BÁSICO",
    "1nm": "1° NIVEL MEDIO",
    "2nm": "2° NIVEL MEDIO",
  };

  const normalizedSchool =
    schoolMap[school?.toLowerCase() as keyof typeof schoolMap] ||
    "Colegio no encontrado";
  const normalizedCourse =
    courseMap[course?.toLowerCase() as keyof typeof courseMap] ||
    "Curso no encontrado";

  const filterStudentsBySchoolAndCourse = (student: Student) => {
    const normalizedStudentSchool = student.school?.trim().toUpperCase();
    const normalizedMappedSchool = normalizedSchool.toUpperCase();

    const normalizedStudentCourse = student.course?.trim().toUpperCase();
    const normalizedMappedCourse = normalizedCourse.toUpperCase();

    return (
      normalizedStudentSchool === normalizedMappedSchool &&
      normalizedStudentCourse === normalizedMappedCourse
    );
  };

  return {
    normalizedSchool,
    normalizedCourse,
    filterStudentsBySchoolAndCourse,
  };
};
