import React from "react";
import FormInput from "../form.input";
import css from "../../../../assets/styles/layout/student.profile.module.scss";
import { formatDateForInput } from "../../../../utils/date.formatters";
import { AddStudentFormProps } from "../../../../interface/common/forms/add.student.form.props";
import { FormSection } from "../form-section/form.section";
import Constants from "../../../../utils/constants";

export const AddStudentForm: React.FC<AddStudentFormProps> = ({
  studentData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        title="Datos personales"
        gridClassName="grid-columns-3"
        sectionCssClass={css.datosPersonales}
      >
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
          options={Constants.GENDER_OPTIONS}
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
          options={Constants.SOURCE_OPTIONS}
        />
        <FormInput
          label="Escuela"
          name="school"
          type="select"
          value={studentData.school || ""}
          onChange={handleChange}
          options={Constants.SCHOOL_OPTIONS}
        />
        <FormInput
          label="Curso"
          name="course"
          type="select"
          value={studentData.course || ""}
          onChange={handleChange}
          options={Constants.COURSE_OPTIONS}
        />
      </FormSection>

      {/* Sección de Contacto */}
      <FormSection
        title="Contacto"
        gridClassName="grid-columns-2"
        sectionCssClass={css.datosComunicacion}
      >
        <FormInput
          label="Estado"
          name="positiveFeedback"
          type="select"
          value={studentData.positiveFeedback || ""}
          onChange={handleChange}
          options={Constants.allFeedbacks}
        />
        <FormInput
          label="¿Quién realizó el contacto?"
          name="contact"
          type="select"
          value={studentData.contact || ""}
          onChange={handleChange}
          options={Constants.CONTACT_PERSON_OPTIONS}
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
          options={Constants.COMMUNICATION_PREFERENCE_OPTIONS}
        />
        <FormInput
          label="Llamada 1 - Completada"
          name="call1"
          type="select"
          value={studentData.call1 || ""}
          onChange={handleChange}
          options={Constants.CALL_STATUS_OPTIONS}
        />
        <FormInput
          label="Comentario Llamada 1"
          name="comments1"
          type="text"
          value={studentData.comments1 || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Llamada 2 - Completada"
          name="call2"
          type="select"
          value={studentData.call2 || ""}
          onChange={handleChange}
          options={Constants.CALL_STATUS_OPTIONS}
        />
        <FormInput
          label="Comentario Llamada 2"
          name="comments2"
          type="text"
          value={studentData.comments2 || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Llamada 3 - Completada"
          name="call3"
          type="select"
          value={studentData.call3 || ""}
          onChange={handleChange}
          options={Constants.CALL_STATUS_OPTIONS}
        />
        <FormInput
          label="Comentario Llamada 3"
          name="comments3"
          type="text"
          value={studentData.comments3 || ""}
          onChange={handleChange}
        />
      </FormSection>

      <FormSection
        title="Documentación"
        gridClassName="grid-columns-2"
        sectionCssClass={css.datosDocumentacion}
      >
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
      </FormSection>

      <button type="submit">Agregar Estudiante</button>
    </form>
  );
};
