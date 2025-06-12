// src/common/statistics.ts
// Importa las interfaces y enums necesarios directamente desde student.ts
import { Student, Source, School, Course } from "../student/student";
// Ya no necesitamos importar StudentList por separado si Student ahora incluye el ID

export interface StudentFiltersProps {
  students: Student[];
  sourceFilter: Source | null;
  schoolFilter: School | null;
  courseFilter: Course | null;
}

export interface SourceFilterProps {
  students: Student[];
  source: Source;
}

export interface SchoolFilterProps {
  students: Student[];
  school: School;
}

export interface CourseFilterProps {
  students: Student[];
  course: Course;
}

export interface StatisticsFiltersProps {
  students: Student[];
  source: Source | null;
  school: School | null;
  course: Course | null;
}

export interface FilteredStatistics {
  socialMediaCount: number;
  captadorCount: number;
  noRegisteredSource: number;
  whatsappCount: number;
  phoneCount: number;
  noRegisteredCommunication: number;
  contactsByPerson: { Captador: string; Contacto: number }[];
  studentsBySchool: { school: string; students: number }[];
  studentsByCollegeCourse: { [school: string]: { [course: string]: number } };
  studentsBySchoolCourseFeedback: {
    Escuela: string;
    Curso: string;
    feedback: string;
    Estudiantes: number;
  }[];
  genderCount: {
    hombres: number;
    mujeres: number;
    otros: number;
    noContesta: number;
  };
  studentsByGeneralState: { estado: string; cantidad: number }[];
  studentsWithoutSchoolAndCourse: number;
}

// Gráficos
export interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
}

export interface PieChartProps {
  data: { name: string; value: number }[];
  title: string;
}

export interface TableProps {
  data: Record<string, any>[];
  columns: string[];
}

export interface StudentTableProps {
  // Ahora espera Student[], que incluye el ID
  students: Student[];
  title: string;
  // filterBySchoolAndCourse YA NO ES UNA PROP AQUÍ
  // filterBySchoolAndCourse?: (student: StudentList) => boolean; // ¡ELIMINADO!
  viewProfilePath: string;
}
