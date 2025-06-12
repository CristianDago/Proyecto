// src/components/statistics/sections/FeedbackBySchoolCourseSection.tsx
import React from 'react';
import { Table } from '../layouts/table';
import { FilteredStatistics } from '../../../interface/common/statistics';
import { allFeedbacks } from '../../../utils/constants'; // Considera mover allFeedbacks a un archivo de constantes

interface FeedbackBySchoolCourseSectionProps {
  filteredStatistics: FilteredStatistics;
}

export const FeedbackBySchoolCourseSection: React.FC<FeedbackBySchoolCourseSectionProps> = React.memo(({
  filteredStatistics,
}) => {
  // Aquí usamos allFeedbacks directamente para asegurar todas las categorías
  // Si no se mueve a constants, deberías pasarlo como prop o redefinirlo aquí.
  const uniqueFeedbacks = Array.from( // Esto era uniqueFeedbacks en statistics.tsx, pero para mostrar todos los feedbacks se usaría allFeedbacks
    new Set(
      filteredStatistics.studentsBySchoolCourseFeedback.map(
        (item) => item.feedback
      )
    )
  );

  return (
    <div className="modulos">
      <h2>Estado de los estudiantes por escuela y curso</h2>
      {allFeedbacks.map((feedback) => ( // Iteramos sobre allFeedbacks para asegurar que todas las categorías se muestren
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
      {/* Tabla para estudiantes sin colegio/curso: considera si es necesaria aquí o si ya está cubierta en StudentsByLevelSection */}
      <Table
        data={[
          {
            "Estudiantes sin colegio/curso":
              filteredStatistics.studentsWithoutSchoolAndCourse,
          },
        ]}
        columns={["Estudiantes sin colegio/curso"]}
      />
    </div>
  );
});