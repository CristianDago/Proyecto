import { School, Course } from "../../interface/student/stundent";
import { SourceFilter } from "./filters/SourceFilter";
import { SchoolFilter } from "./filters/SchoolFilter";
import { CourseFilter } from "./filters/CourseFilter";
import {
  StatisticsFiltersProps,
  FilteredStatistics,
} from "../../interface/common/statistics";

const schoolMap: Record<School, string> = {
  [School.Quinta]: "QUINTA NORMAL",
  [School.Buin]: "BUÍN",
  [School.Granja]: "LA GRANJA",
  [School.Nunoa]: "ÑUÑOA",
  [School.Pudahuel]: "PUDAHUEL",
  [School.Miguel]: "SAN MIGUEL",
};

const courseMap: Record<Course, string> = {
  [Course.NB1]: "1° NIVEL BÁSICO",
  [Course.NB2]: "2° NIVEL BÁSICO",
  [Course.NB3]: "3° NIVEL BÁSICO",
  [Course.NM1]: "1° NIVEL MEDIO",
  [Course.NM2]: "2° NIVEL MEDIO",
};

export const calculateStatistics = ({
  students,
  source,
  school,
  course,
}: StatisticsFiltersProps): FilteredStatistics => {
  let filteredStudents = students;

  // Primero obtenemos los estados únicos de feedback sin aplicar ningún filtro
  const uniqueFeedbacks = Array.from(
    new Set(students.map((s) => s.positiveFeedback || "AÚN SIN RESPUESTAS"))
  );

  // Luego filtramos los estudiantes por fuente, escuela y curso solo si los parámetros están definidos
  if (source) {
    filteredStudents = SourceFilter({ students: filteredStudents, source });
  }
  if (school) {
    filteredStudents = SchoolFilter({ students: filteredStudents, school });
  }
  if (course) {
    filteredStudents = CourseFilter({ students: filteredStudents, course });
  }

  const studentsWithoutSchoolAndCourse = filteredStudents.filter(
    (s) => !s.school || !s.course
  ).length;

  const studentsByGeneralState: { estado: string; cantidad: number }[] = [];

  // Ahora que los estudiantes están filtrados, contamos la cantidad de estudiantes por cada feedback
  uniqueFeedbacks.forEach((feedback) => {
    studentsByGeneralState.push({
      estado: feedback,
      cantidad: filteredStudents.filter(
        (s) => (s.positiveFeedback || "AÚN SIN RESPUESTAS") === feedback
      ).length,
    });
  });

  const socialMediaCount = filteredStudents.filter(
    (s) => s.source === "REDES SOCIALES"
  ).length;
  const captadorCount = filteredStudents.filter(
    (s) => s.source === "CAPTADOR"
  ).length;

  const noRegisteredSource = filteredStudents.filter((s) => !s.source).length;

  const whatsappCount = filteredStudents.filter(
    (s) => s.communicationPreference === "WHATSAPP"
  ).length;
  const phoneCount = filteredStudents.filter(
    (s) => s.communicationPreference === "TELÉFONO"
  ).length;

  const noRegisteredCommunication = filteredStudents.filter(
    (s) => !s.communicationPreference
  ).length;

  // Modificar la función contactsByPerson para incluir los captadores sin respuesta
  // src/components/statistics/statisticsFilters.tsx

  const contactsByPerson = [
    "Lorena",
    "Arlette",
    "María",
    "Rowina",
    "No Ingresa Captador",
  ].map((person) => {
    let studentCount = 0;

    if (person === "No Ingresa Captador") {
      // Si el nombre es "No Ingresa Captador", contamos los estudiantes sin captador
      studentCount = filteredStudents.filter((s) => !s.contact).length;
    } else {
      // De lo contrario, contamos los estudiantes asignados a ese captador
      studentCount = filteredStudents.filter(
        (s) => s.contact === person.toUpperCase()
      ).length;
    }

    return {
      Captador: person,
      Contacto: studentCount,
    };
  });

  const studentsBySchool = Object.values(School).map((schoolValue) => ({
    school: schoolMap[schoolValue],
    students: filteredStudents.filter((s) => s.school === schoolValue).length,
  }));

  const studentsByCollegeCourse: {
    [school: string]: { [course: string]: number };
  } = {};
  Object.values(School).forEach((schoolValue) => {
    const schoolName = schoolMap[schoolValue];
    studentsByCollegeCourse[schoolName] = {};
    Object.values(Course).forEach((courseValue) => {
      const courseName = courseMap[courseValue];
      studentsByCollegeCourse[schoolName][courseName] = filteredStudents.filter(
        (s) => s.school === schoolValue && s.course === courseValue
      ).length;
    });
  });

  const studentsBySchoolCourseFeedback: {
    Escuela: string;
    Curso: string;
    feedback: string;
    Estudiantes: number;
  }[] = [];

  Object.values(School).forEach((schoolValue) => {
    Object.values(Course).forEach((courseValue) => {
      uniqueFeedbacks.forEach((feedback) => {
        studentsBySchoolCourseFeedback.push({
          Escuela: schoolMap[schoolValue],
          Curso: courseMap[courseValue],
          feedback,
          Estudiantes: filteredStudents.filter(
            (s) =>
              s.school === schoolValue &&
              s.course === courseValue &&
              (s.positiveFeedback || "AÚN SIN RESPUESTAS") === feedback
          ).length,
        });
      });
    });
  });

  const genderCount = {
    hombres: filteredStudents.filter((s) => s.sex === "MASCULINO").length,
    mujeres: filteredStudents.filter((s) => s.sex === "FEMENINO").length,
    otros: filteredStudents.filter((s) => s.sex === "OTROS").length,
    noContesta: filteredStudents.filter((s) => !s.sex).length,
  };

  return {
    socialMediaCount,
    captadorCount,
    noRegisteredSource,
    whatsappCount,
    phoneCount,
    noRegisteredCommunication,
    contactsByPerson,
    studentsBySchool,
    studentsByCollegeCourse,
    studentsBySchoolCourseFeedback,
    genderCount,
    studentsByGeneralState,
    studentsWithoutSchoolAndCourse, // Ahora esta propiedad tiene un valor
  };
};
