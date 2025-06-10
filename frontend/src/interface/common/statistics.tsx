import { Student } from "../student/stundent";
import { Source } from "../student/stundent";
import { School } from "../student/stundent";
import { Course } from "../student/stundent";
import { StudentList } from "../student/studentList";

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
  students: StudentList[];
  title: string;
  filterBySchoolAndCourse?: (student: StudentList) => boolean;
  viewProfilePath: string;
}
