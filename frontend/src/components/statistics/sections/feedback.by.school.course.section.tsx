import React from "react";
import { Table } from "../layouts/table";
import type { FilteredStatistics } from "../../../interface/common/statistics";
import Constants from "../../../utils/constants";

interface FeedbackBySchoolCourseSectionProps {
  filteredStatistics: FilteredStatistics;
}

export const FeedbackBySchoolCourseSection: React.FC<FeedbackBySchoolCourseSectionProps> =
  React.memo(({ filteredStatistics }) => {
    const allFeedbacks = Constants.allFeedbacks;

    return (
      <div className="modulos">
        <h2>Estado de los estudiantes por escuela y curso</h2>
        {allFeedbacks.map((feedback) => (
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
      </div>
    );
  });
