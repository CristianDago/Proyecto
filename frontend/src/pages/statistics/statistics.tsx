import { useState } from "react";
import { useStudents } from "../../hooks/useStudents";
import { calculateStatistics } from "../../components/statistics/statisticsFilters";
import { BarChart } from "../../components/statistics/layouts/barChart";
import { Table } from "../../components/statistics/layouts/table";
import { Source, School, Course } from "../../interface/student/stundent";
import { Grid } from "../../components/common/grid/grid";
import css from "./statistics.module.scss";

const Statistics = () => {
  const { students, error, loading } = useStudents();
  const [source, setSource] = useState<Source | null>(null);
  const [school, setSchool] = useState<School | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!students || students.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const filteredStatistics = calculateStatistics({
    students,
    source,
    school,
    course,
  });

  const uniqueFeedbacks = Array.from(
    new Set(
      filteredStatistics.studentsBySchoolCourseFeedback.map(
        (item) => item.feedback
      )
    )
  );

  const allFeedbacks = [
    "AÚN SIN RESPUESTAS",
    "NO SE MATRICULARÁ",
    "INCONTACTABLE",
    "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN",
    "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA",
    "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA",
    "PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA",
    "INTERESADA PARA PRÓXIMO AÑO",
    "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA",
  ];

  // Crear datos para los feedbacks, asegurando que todos estén presentes
  const feedbackData = allFeedbacks.map((feedback) => {
    const count = filteredStatistics.studentsBySchoolCourseFeedback
      .filter((item) => item.feedback === feedback)
      .reduce((acc, item) => acc + item.Estudiantes, 0);

    return {
      Estado: feedback,
      Estudiantes: count || 0, // Asegura que siempre haya un valor numérico
    };
  });

  // Mostrar todos los feedbacks, incluso aquellos sin estudiantes
  const tableData = allFeedbacks.map((feedback) => {
    const count = filteredStatistics.studentsByGeneralState.find(
      (item) => item.estado === feedback
    )?.cantidad;

    return {
      Estado: feedback,
      Estudiantes: count || 0, // Si no hay estudiantes en ese feedback, poner 0
    };
  });

  // Mostrar todos los cursos por cada escuela, incluso si el número de estudiantes es 0
  const studentsBySchoolCourse = Object.entries(
    filteredStatistics.studentsByCollegeCourse
  ).map(([school, courses]) => {
    const courseData = Object.entries(courses).map(([course, count]) => ({
      Curso: course,
      Estudiantes: count || 0, // Si no hay estudiantes, poner 0
    }));

    return {
      school,
      courses: courseData,
    };
  });

  return (
    <div>
      <h1>Estadísticas</h1>
      <Grid className={css.modulos}>
        <h2>Estado general de los estudiantes</h2>
        <Table
          data={tableData} // Usamos tableData aquí
          columns={["Estado", "Estudiantes"]}
        />
      </Grid>

      <Grid className={css.modulos}>
        <h2>Preferencia de comunicación</h2>
        <BarChart
          data={[
            { name: "WhatsApp", value: filteredStatistics.whatsappCount },
            { name: "Teléfono", value: filteredStatistics.phoneCount },
            {
              name: "No registrada",
              value: filteredStatistics.noRegisteredCommunication,
            },
          ]}
          title="Preferencia de comunicación"
        />
      </Grid>

      <Grid className={css.modulos}>
        <h2>Fuente de inscripción</h2>
        <BarChart
          data={[
            {
              name: "Redes Sociales",
              value: filteredStatistics.socialMediaCount,
            },
            { name: "Captador", value: filteredStatistics.captadorCount },
            {
              name: "No registrada",
              value: filteredStatistics.noRegisteredSource,
            },
          ]}
          title="Fuentes de Inscripción"
        />
      </Grid>

      <Grid className={css.modulos}>
        <h2>Distribución por Género</h2>
        <BarChart
          data={[
            { name: "Hombres", value: filteredStatistics.genderCount.hombres },
            { name: "Mujeres", value: filteredStatistics.genderCount.mujeres },
            { name: "Otros", value: filteredStatistics.genderCount.otros },
            {
              name: "No registrado",
              value: filteredStatistics.genderCount.noContesta,
            },
          ]}
          title="Distribución por Género"
        />
      </Grid>

      <Grid className={css.modulos}>
        <h2>Captadores</h2>
        <Table
          data={filteredStatistics.contactsByPerson} // Usamos la variable contactsByPerson
          columns={["Captador", "Contacto"]} // Mostramos solo las columnas "Captador" y "Contacto"
        />
      </Grid>

      <Grid className={css.modulos}>
        <h2>Estudiantes por nivel</h2>
        {studentsBySchoolCourse.map((schoolData) => (
          <div key={schoolData.school}>
            <h3>{schoolData.school}</h3>
            <Table
              data={schoolData.courses} // Mapeo de los cursos
              columns={["Curso", "Estudiantes"]}
            />
          </div>
        ))}
        <Table
          data={[
            {
              "Estudiantes sin colegio/curso":
                filteredStatistics.studentsWithoutSchoolAndCourse,
            },
          ]}
          columns={["Estudiantes sin colegio/curso"]}
        />
      </Grid>

      <Grid className={css.modulos}>
        <h2>Estado de los estudiantes</h2>
        {uniqueFeedbacks.map((feedback) => (
          <div key={feedback}>
            <h3>{feedback}</h3>
            <Table
              data={filteredStatistics.studentsBySchoolCourseFeedback
                .filter((item) => item.feedback === feedback)
                .map((item) => ({
                  Escuela: item.Escuela,
                  Curso: item.Curso,
                  Estudiantes: item.Estudiantes,
                }))}
              columns={["Escuela", "Curso", "Estudiantes"]}
            />
          </div>
        ))}
        <Table
          data={[
            {
              "Estudiantes sin colegio/curso":
                filteredStatistics.studentsWithoutSchoolAndCourse,
            },
          ]}
          columns={["Estudiantes sin colegio/curso"]}
        />
      </Grid>
    </div>
  );
};

export default Statistics;
