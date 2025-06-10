import React from "react";
import { Student } from "../../interface/student/stundent";
import { Grid } from "../../components/common/grid/grid";
import css from "./studentProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faIdCard,
  faBirthdayCake,
  faVenusMars,
  faMapMarkerAlt,
  faFlag,
  faSchool,
  faChalkboardTeacher,
  faBook,
  faCheckCircle,
  faUser,
  faCalendarAlt,
  faComment,
  faMobile,
  faEnvelope,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

interface StudentDetailsProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({
  student,
  onEdit,
  onDelete,
}) => {
  const getDocumentButton = (label: string, link?: string | File | null) => {
    // Si es un File o null, no mostrar el enlace
    const href = typeof link === "string" ? link : undefined;

    return (
      <a
        href={href || ""}
        target="_blank"
        rel="noopener noreferrer"
        className={href ? "" : css.disabledLink}
      >
        <button disabled={!href} className={href ? "" : css.disabledButton}>
          {href ? label : <FontAwesomeIcon icon={faFile} />}
          {!href && ` ${label}`}
        </button>
      </a>
    );
  };
  return (
    <>
      <Grid className={`grid-columns-2 ${css.mainInformation}`}>
        <div>
          <FontAwesomeIcon icon={faCircleUser} className={css.iconUser} />
        </div>

        <div>
          <h1>{`${student.name || "NO REGISTRADO"} ${
            student.lastname || "NO REGISTRADO"
          }`}</h1>

          <ul className={css.profile}>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className={css.profileIcon} />
              Email: {student.email || "NO REGISTRADO"}
            </li>
            <li>
              <FontAwesomeIcon icon={faMobile} className={css.profileIcon} />{" "}
              Teléfono: {student.phone || "NO REGISTRADO"}
            </li>
          </ul>
          <Grid className="grid-columns-2">
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
          </Grid>
        </div>
      </Grid>

      <Grid className={`grid-columns-2 ${css.personalData}`}>
        <div>
          <h2>Datos Personales</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faIdCard} className={css.profileIcon} />{" "}
              <strong>Rut:</strong> {student.rut || "NO REGISTRADO"}
            </li>
            <li>
              <FontAwesomeIcon
                icon={faBirthdayCake}
                className={css.profileIcon}
              />{" "}
              <strong>Fecha de Nacimiento:</strong>{" "}
              {student.birthdate
                ? new Date(student.birthdate).toLocaleDateString()
                : "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon icon={faVenusMars} className={css.profileIcon} />{" "}
              <strong>Género:</strong> {student.sex || "NO REGISTRADO"}
            </li>
            <li>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className={css.profileIcon}
              />{" "}
              <strong>Dirección:</strong> {student.address || "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon icon={faFlag} className={css.profileIcon} />{" "}
              <strong>Nacionalidad:</strong>{" "}
              {student.nationality || "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon icon={faSchool} className={css.profileIcon} />{" "}
              <strong>Colegio:</strong> {student.school || "NO REGISTRADO"}
            </li>
            <li>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className={css.profileIcon}
              />{" "}
              <strong>Curso:</strong> {student.course || "NO REGISTRADO"}
            </li>
          </ul>
        </div>

        <div>
          <h2>Datos de Contacto</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faBook} className={css.profileIcon} />{" "}
              <strong>Fuente:</strong> {student.source || "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={css.profileIcon}
              />
              <strong>Estado:</strong>{" "}
              {student.positiveFeedback || "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} className={css.profileIcon} />{" "}
              <strong>¿Quién realizó el contacto?:</strong>{" "}
              {student.contact || "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className={css.profileIcon}
              />{" "}
              <strong>Fecha de contacto:</strong>{" "}
              {student.contactDate
                ? new Date(student.contactDate).toLocaleDateString()
                : "NO REGISTRADA"}
            </li>
            <li>
              <FontAwesomeIcon icon={faComment} className={css.profileIcon} />{" "}
              <strong>Preferencia de Comunicación:</strong>{" "}
              {student.communicationPreference || "NO REGISTRADA"}
            </li>
          </ul>
        </div>
      </Grid>

      <Grid className={`grid-columns-2 ${css.personalData}`}>
        <div>
          <h2>Datos llamadas</h2>
        </div>
        <div></div>

        <div>
          <h3>Llamada 01</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faMobile} className={css.profileIcon} />{" "}
              <strong>¿Contestó la llamada?</strong>
            </li>
            <li>{student.call1 || "NO REGISTRADO"}</li>
          </ul>
          <ul className={css.comments}>
            <li>
              <FontAwesomeIcon icon={faComment} className={css.profileIcon} />{" "}
              <strong>Comentario 01</strong>
            </li>
            <li>{student.comments1 || "NO REGISTRADO"} </li>
          </ul>
        </div>

        <div>
          <h3>Llamada 02</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faMobile} className={css.profileIcon} />
              <strong>¿Contestó la llamada?</strong>
            </li>
            <li>{student.call2 || "NO REGISTRADO"}</li>
          </ul>
          <ul className={css.comments}>
            <li>
              <FontAwesomeIcon icon={faComment} className={css.profileIcon} />
              <strong>Comentario 02</strong>
            </li>
            <li>{student.comments2 || "NO REGISTRADO"} </li>
          </ul>
        </div>

        <div>
          <h3>Llamada 03</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faMobile} className={css.profileIcon} />
              <strong>¿Contestó la llamada?</strong>
            </li>
            <li>{student.call3 || "NO REGISTRADO"}</li>
          </ul>
          <ul className={css.comments}>
            <li>
              <FontAwesomeIcon icon={faComment} className={css.profileIcon} />
              <strong>Comentario 03</strong>
            </li>
            <li>{student.comments3 || "NO REGISTRADO"} </li>
          </ul>
        </div>
      </Grid>

      <div className={`grid-columns-3 ${css.personalData}`}>
        <div>
          <h2>Documentos</h2>
          <Grid className="grid-columns-2">
            {getDocumentButton("Foto del Estudiante", student.studentImage)}
            {getDocumentButton(
              "Certificado de nacimiento",
              student.birthCertificate
            )}
            {getDocumentButton(
              "Certificado de estudio",
              student.studyCertificate
            )}
            {getDocumentButton("Cédula de identidad", student.linkDni)}
          </Grid>
        </div>
      </div>
      <div>
        <div>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className={css.profileIcon}
              />
              <strong>Fecha de Creación:</strong>
              {student.createdAt
                ? new Date(student.createdAt).toLocaleDateString()
                : "NO REGISTRADA"}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
