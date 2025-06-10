// src/components/StudentTable.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./StudentTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { StudentTableProps } from "../../interface/common/statistics";

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  title,
  filterBySchoolAndCourse,
  viewProfilePath,
}) => {
  const navigate = useNavigate();
  const [searchRut, setSearchRut] = useState("");
  const [filterFeedback, setFilterFeedback] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  const colors: Record<string, string> = {
    "AÚN SIN RESPUESTAS": "#ffffff",
    "NO SE MATRICULARÁ": "#ff0000",
    INCONTACTABLE: "#ff9900",
    "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN": "#ffff00",
    "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA":
      "#00ffff",
    "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA": "#ff00ff",
    "PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA": "#00ff00",
    "INTERESADA PARA PRÓXIMO AÑO": "#1155cc",
    "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA":
      "#9900ff",
  };

  const getBackgroundColor = (positiveFeedback: string) => {
    return colors[positiveFeedback] || "#FFFFFF";
  };

  let filteredStudents = students;

  if (filterBySchoolAndCourse) {
    filteredStudents = filteredStudents.filter(filterBySchoolAndCourse);
  }

  filteredStudents = filteredStudents.filter((student) => {
    return (
      (searchRut === "" || student.rut?.includes(searchRut)) &&
      (filterFeedback === "" || student.positiveFeedback === filterFeedback)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handleViewProfile = (id: string) => {
    navigate(`${viewProfilePath}/${id}`);
  };

  return (
    <>
      <h1>{title}</h1>
      <p className={css.counter}>
        Total de estudiantes: {filteredStudents.length}
      </p>

      <div className={css.filters}>
        <input
          type="text"
          placeholder="Buscar por RUT"
          value={searchRut}
          onChange={(e) => setSearchRut(e.target.value)}
        />
        <select
          value={filterFeedback}
          onChange={(e) => setFilterFeedback(e.target.value)}
        >
          <option value="">Todos los estados</option>
          {Object.keys(colors).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className={css.studentTableContainer}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>RUT</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.lastname}</td>
                  <td>{student.rut}</td>
                  <td
                    style={{
                      backgroundColor: getBackgroundColor(
                        student.positiveFeedback
                      ),
                    }}
                  >
                    {student.positiveFeedback}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewProfile(student.id)}
                      className={css.viewProfileButton}
                    >
                      Ver Perfil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No hay estudiantes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={css.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faCircleLeft} className={css.icons} />
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faCircleRight} className={css.icons} />
        </button>
      </div>
    </>
  );
};
