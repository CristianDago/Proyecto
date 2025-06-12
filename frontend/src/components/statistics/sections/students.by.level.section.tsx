import React from "react";
import { Table } from "../layouts/table";
import type { FilteredStatistics } from "../../../interface/common/statistics";

interface StudentsByLevelSectionProps {
  filteredStatistics: FilteredStatistics;
}

export const StudentsByLevelSection: React.FC<StudentsByLevelSectionProps> =
  React.memo(({ filteredStatistics }) => {
    const studentsBySchoolCourseData = Object.entries(
      filteredStatistics.studentsByCollegeCourse
    ).map(([school, courses]) => {
      const courseData = Object.entries(courses).map(([course, count]) => ({
        Curso: course,
        Estudiantes: count || 0,
      }));

      return {
        school,
        courses: courseData,
      };
    });

    return (
      <div className="modulos">
        <h2>Estudiantes por nivel</h2>
        {studentsBySchoolCourseData.map((schoolData) => (
          <div key={schoolData.school}>
            <h3>{schoolData.school}</h3>
            <Table
              data={schoolData.courses}
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
      </div>
    );
  });
