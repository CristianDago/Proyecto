// src/components/common/forms/update-student/update.student.form.tsx

import { useCallback } from "react";
import type { Student } from "../../../../interface/student/student"; // Importación de tipo
import FormInput from "../form.input"; // Asumiendo esta ruta
import { Grid } from "../../grid/grid"; // Asumiendo esta ruta
import css from "../../../../assets/styles/layout/student.profile.module.scss"; // Ajusta la ruta a tu SCSS
import { formatDateForInput } from "../../../../utils/date.formatters"; // Importa la función directamente
import { useDocumentHandling } from "../../../../hooks/use.document.handling"; // Hook para manejo de documentos
import type { StudentFormProps } from "../../../../interface/student/update.student.form.props"; // Importación de tipo
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const StudentForm: React.FC<StudentFormProps> = ({
  student, // Datos del estudiante a mostrar/editar
  onChange, // Manejador de cambios para los inputs
  onSubmit, // Manejador para el envío del formulario
  onDeleteFile, // Manejador para la eliminación de archivos específicos
}) => {
  // Eliminamos 'getLabelForField' de la desestructuración, ya que se usa internamente en useDocumentHandling
  const { handleFileChange, handleDeleteFile: handleConfirmDeleteFile } =
    useDocumentHandling({ onChange, onDeleteFile });

  /**
   * Renderiza un FormInput para la carga de documentos (archivos).
   * Muestra un enlace para ver el archivo existente y un botón para eliminarlo si ya existe.
   * @param label Etiqueta visible del input.
   * @param name Nombre del campo en el objeto Student (ej. 'studentImage').
   */
  const renderDocumentInput = useCallback(
    (label: string, name: keyof Student) => {
      const value = student[name];
      const hasExistingFile = value && typeof value === "string";

      return (
        <div className={css.documentInputContainer}>
          <FormInput
            label={label}
            name={name}
            type="file" // Tipo de input para archivos
            accept="image/*" // Solo acepta archivos de imagen
            // Se usa el handleFileChange del hook useDocumentHandling
            onChange={(e) =>
              handleFileChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
          {hasExistingFile && ( // Si existe un archivo previo, muestra acciones
            <div className={css.documentActions}>
              <a
                href={value as string} // Asegura que 'value' es string para el href
                target="_blank" // Abre el enlace en una nueva pestaña
                rel="noopener noreferrer" // Mejora la seguridad al abrir enlaces externos
                className={css.viewDocument}
              >
                Ver actual
              </a>
              <button
                type="button" // Importante: evita que el botón envíe el formulario
                // Llama a la función de confirmación de eliminación de useDocumentHandling
                onClick={() => handleConfirmDeleteFile(name)}
                className={css.deleteDocument}
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </div>
          )}
        </div>
      );
    },
    // Dependencias de useCallback: se re-crea si alguna de estas funciones o el 'student' cambia
    // 'css' también se incluye si se usa en el closure y no es una constante.
    [handleFileChange, handleConfirmDeleteFile, student, css]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className={css.datosPersonales}>
        <h2>Datos personales</h2>
        <Grid className="grid-columns-3">
          <FormInput
            label="Nombres"
            name="name"
            type="text"
            value={student.name || ""} // Asegura que el valor sea una cadena
            onChange={onChange}
            required
          />
          <FormInput
            label="Apellido"
            name="lastname"
            type="text"
            value={student.lastname || ""}
            onChange={onChange}
            required
          />
          <FormInput
            label="RUT"
            name="rut"
            type="text"
            value={student.rut || ""}
            onChange={onChange}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={student.email || ""}
            onChange={onChange}
          />
          <FormInput
            label="Teléfono"
            name="phone"
            type="text"
            value={student.phone || ""}
            onChange={onChange}
          />
          <FormInput
            label="Fecha de Nacimiento"
            name="birthdate"
            type="date"
            // Uso directo de la función utilitaria formatDateForInput
            value={formatDateForInput(student.birthdate)}
            onChange={onChange}
          />
          <FormInput
            label="Género"
            name="sex"
            type="select"
            value={student.sex || ""}
            onChange={onChange}
            options={["", "MASCULINO", "FEMENINO", "OTROS"]}
          />
          <FormInput
            label="Dirección"
            name="address"
            type="text"
            value={student.address || ""}
            onChange={onChange}
          />
          <FormInput
            label="Nacionalidad"
            name="nationality"
            type="text"
            value={student.nationality || ""}
            onChange={onChange}
          />
          <FormInput
            label="Fuente"
            name="source"
            type="select"
            value={student.source || ""}
            onChange={onChange}
            options={["", "REDES SOCIALES", "CAPTADOR"]}
          />
          <FormInput
            label="Escuela"
            name="school"
            type="select"
            value={student.school || ""}
            onChange={onChange}
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
            value={student.course || ""}
            onChange={onChange}
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
        <h2>CONTACTO</h2>
        <Grid className="grid-columns-2">
          <FormInput
            label="Estado"
            name="positiveFeedback"
            type="select"
            value={student.positiveFeedback || ""}
            onChange={onChange}
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
            value={student.contact || ""}
            onChange={onChange}
            options={["", "LORENA", "ARLETTE", "MARÍA", "ROWINA"]}
          />
          <FormInput
            label="Fecha de contacto"
            name="contactDate"
            type="date"
            // Uso directo de la función utilitaria formatDateForInput
            value={formatDateForInput(student.contactDate)}
            onChange={onChange}
          />
          <FormInput
            label="Preferencia de Comunicación"
            name="communicationPreference"
            type="select"
            value={student.communicationPreference || ""}
            onChange={onChange}
            options={["", "WHATSAPP", "TELÉFONO"]}
          />
          <FormInput
            label="Llamada 1 - Completada"
            name="call1"
            type="select"
            value={student.call1 || ""}
            onChange={onChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 1"
            name="comments1"
            type="text"
            value={student.comments1 || ""}
            onChange={onChange}
          />
          <FormInput
            label="Llamada 2 - Completada"
            name="call2"
            type="select"
            value={student.call2 || ""}
            onChange={onChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 2"
            name="comments2"
            type="text"
            value={student.comments2 || ""}
            onChange={onChange}
          />
          <FormInput
            label="Llamada 3 - Completada"
            name="call3"
            type="select"
            value={student.call3 || ""}
            onChange={onChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 3"
            name="comments3"
            type="text"
            value={student.comments3 || ""}
            onChange={onChange}
          />
        </Grid>
      </div>
      <div className={css.datosDocumentacion}>
        <h2>DOCUMENTACIÓN</h2>
        <Grid className="grid-columns-2">
          {renderDocumentInput("Foto del Estudiante", "studentImage")}
          {renderDocumentInput("Certificado de nacimiento", "birthCertificate")}
          {renderDocumentInput("Certificado de estudio", "studyCertificate")}
          {renderDocumentInput("Cédula de identidad", "linkDni")}
        </Grid>
      </div>
      <button type="submit">Actualizar estudiante</button>
    </form>
  );
};

export default StudentForm;