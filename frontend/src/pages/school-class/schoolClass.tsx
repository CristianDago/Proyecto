// src/pages/schoolClass.tsx
import { Grid } from "../../components/common/grid/grid";
import { useStudentsList } from "../../hooks/useStudentsList";
import { StudentTable } from "../../components/student-table/studentTable";
import { useSchoolClass } from "../../hooks/useSchoolClass";

export default function SchoolClass() {
  const { students, error, loading } = useStudentsList();
  const {
    normalizedSchool,
    normalizedCourse,
    filterStudentsBySchoolAndCourse,
  } = useSchoolClass();

  if (loading) return <p>Cargando estudiantes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid>
      <StudentTable
        students={students}
        title={`${normalizedSchool} - ${normalizedCourse}`}
        filterBySchoolAndCourse={filterStudentsBySchoolAndCourse}
        viewProfilePath="/dashboard/student"
      />
    </Grid>
  );
}
