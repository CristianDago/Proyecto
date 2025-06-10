import React from "react";
import FormInput from "../formInput";
import { Grid } from "../../grid/grid";
import css from "../../../../pages/student-profile/studentProfile.module.scss";
import { useFormatDateForInput } from "../../../../hooks/useFormatDateForInput";
import { AddStudentFormProps } from "../../../../interface/student/addStudentFormProps";

export const AddStudentForm: React.FC<AddStudentFormProps> = ({
  studentData,
  handleChange,
  handleSubmit,
}) => {
  // Función para formatear fechas para el input date
  const { formatDateForInput } = useFormatDateForInput();

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.datosPersonales}>
        <h2>Datos personales</h2>
        <Grid className="grid-columns-3">
          <FormInput
            label="Nombres"
            name="name"
            type="text"
            value={studentData.name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Apellidos"
            name="lastname"
            type="text"
            value={studentData.lastname}
            onChange={handleChange}
            required
          />
          <FormInput
            label="RUT"
            name="rut"
            type="text"
            value={studentData.rut || ""}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={studentData.email || ""}
            onChange={handleChange}
          />
          <FormInput
            label="Teléfono"
            name="phone"
            type="text"
            value={studentData.phone || ""}
            onChange={handleChange}
          />
          <FormInput
            label="Fecha de Nacimiento"
            name="birthdate"
            type="date"
            value={formatDateForInput(studentData.birthdate)}
            onChange={handleChange}
          />
          <FormInput
            label="Género"
            name="sex"
            type="select"
            value={studentData.sex || ""}
            onChange={handleChange}
            options={["", "MASCULINO", "FEMENINO", "OTROS"]}
          />
          <FormInput
            label="Dirección"
            name="address"
            type="text"
            value={studentData.address || ""}
            onChange={handleChange}
          />
          <FormInput
            label="Nacionalidad"
            name="nationality"
            type="text"
            value={studentData.nationality || ""}
            onChange={handleChange}
          />
          <FormInput
            label="Fuente"
            name="source"
            type="select"
            value={studentData.source || ""}
            onChange={handleChange}
            options={["", "REDES SOCIALES", "CAPTADOR"]}
          />
          <FormInput
            label="Escuela"
            name="school"
            type="select"
            value={studentData.school || ""}
            onChange={handleChange}
            options={[
              "",
              "QUINTA NORMAL",
              "BUÍN",
              "LA GRANJA",
              "ÑUÑOA",
              "PUDAHUEL",
              "SAN MIGUEL",
            ]}
          />
          <FormInput
            label="Curso"
            name="course"
            type="select"
            value={studentData.course || ""}
            onChange={handleChange}
            options={[
              "",
              "1° NIVEL BÁSICO",
              "2° NIVEL BÁSICO",
              "3° NIVEL BÁSICO",
              "1° NIVEL MEDIO",
              "2° NIVEL MEDIO",
            ]}
          />
        </Grid>
      </div>

      <div className={css.datosComunicacion}>
        <h2>Contacto</h2>
        <Grid className="grid-columns-2">
          <FormInput
            label="Estado"
            name="positiveFeedback"
            type="select"
            value={studentData.positiveFeedback || ""}
            onChange={handleChange}
            options={[
              "",
              "AÚN SIN RESPUESTAS",
              "NO SE MATRICULARÁ",
              "INCONTACTABLE",
              "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN",
              "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA",
              "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA",
              "PERSONA CON DOCUMENTACIÓN y MATRÍCULA FIRMADA EN ESCUELA",
              "INTERESADA PARA PRÓXIMO AÑO",
              "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA",
            ]}
          />
          <FormInput
            label="¿Quién realizó el contacto?"
            name="contact"
            type="select"
            value={studentData.contact || ""}
            onChange={handleChange}
            options={["", "LORENA", "ARLETTE", "MARÍA", "ROWINA"]}
          />
          <FormInput
            label="Fecha de contacto"
            name="contactDate"
            type="date"
            value={formatDateForInput(studentData.contactDate)}
            onChange={handleChange}
          />
          <FormInput
            label="Preferencia de Comunicación"
            name="communicationPreference"
            type="select"
            value={studentData.communicationPreference || ""}
            onChange={handleChange}
            options={["", "WHATSAPP", "TELÉFONO"]}
          />
          <FormInput
            label="Llamada 1 - Completada"
            name="call1"
            type="select"
            value={studentData.call1}
            onChange={handleChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 1"
            name="comments1"
            type="text"
            value={studentData.comments1}
            onChange={handleChange}
          />
          <FormInput
            label="Llamada 2 - Completada"
            name="call2"
            type="select"
            value={studentData.call2}
            onChange={handleChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 2"
            name="comments2"
            type="text"
            value={studentData.comments2}
            onChange={handleChange}
          />
          <FormInput
            label="Llamada 3 - Completada"
            name="call3"
            type="select"
            value={studentData.call3}
            onChange={handleChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 3"
            name="comments3"
            type="text"
            value={studentData.comments3}
            onChange={handleChange}
          />
        </Grid>
      </div>

      <div className={css.datosDocumentacion}>
        <h2>Documentación</h2>
        <Grid className="grid-columns-2">
          <FormInput
            label="Foto del Estudiante"
            name="studentImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <FormInput
            label="Certificado de nacimiento"
            name="birthCertificate"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <FormInput
            label="Certificado de estudio"
            name="studyCertificate"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <FormInput
            label="Cédula de identidad"
            name="linkDni"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Grid>
      </div>

      <button type="submit">Agregar Estudiante</button>
    </form>
  );
};
