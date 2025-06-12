import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import type { Student } from "../interface/student/student";
import { DateTime } from "luxon";

import { mapStudentToFormData } from "../utils/student.form.mapper";
import { addStudent } from "../utils/fetch.students";

export function useAddStudent(token: string | null | undefined) {
  const [formKey, setFormKey] = useState(Date.now());
  const [studentData, setStudentData] = useState<Student>({
    name: "",
    lastname: "",
    rut: "",
    sex: undefined,
    birthdate: undefined,
    nationality: "",
    address: "",
    phone: "",
    email: "",
    source: undefined,
    contact: "",
    contactDate: undefined,
    call1: "",
    call2: "",
    call3: "",
    comments1: "",
    comments2: "",
    comments3: "",
    positiveFeedback: "AÚN SIN RESPUESTAS",
    studentImage: undefined,
    birthCertificate: undefined,
    studyCertificate: undefined,
    linkDni: undefined,
    school: undefined,
    course: undefined,
    communicationPreference: undefined,
    createdAt: undefined,
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setStudentData((prevData) => {
        const { name, value, type } = e.target;

        if (type === "file") {
          const inputElement = e.target as HTMLInputElement;
          return { ...prevData, [name]: inputElement.files?.[0] || undefined };
        } else if ((name === "birthdate" || name === "contactDate") && value) {
          const formattedDate = DateTime.fromISO(value, {
            zone: "America/Santiago",
          }).isValid
            ? DateTime.fromISO(value, { zone: "America/Santiago" }).toISODate()
            : undefined; // Si no es válido, undefined
          return { ...prevData, [name]: formattedDate };
        } else if (value === "undefined") {
          return { ...prevData, [name]: undefined };
        } else {
          return { ...prevData, [name]: value };
        }
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!token) {
        setErrorMessage("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      setErrorMessage("");
      setSuccessMessage("");

      const formData = mapStudentToFormData(studentData);

      try {
        await addStudent(token, formData);

        setSuccessMessage("Estudiante agregado con éxito.");
        setStudentData({
          name: "",
          lastname: "",
          rut: "",
          sex: undefined,
          birthdate: undefined,
          nationality: "",
          address: "",
          phone: "",
          email: "",
          source: undefined,
          contact: "",
          contactDate: undefined,
          call1: "",
          call2: "",
          call3: "",
          comments1: "",
          comments2: "",
          comments3: "",
          positiveFeedback: "AÚN SIN RESPUESTAS",
          studentImage: undefined,
          birthCertificate: undefined,
          studyCertificate: undefined,
          linkDni: undefined,
          school: undefined,
          course: undefined,
          communicationPreference: undefined,
          createdAt: undefined,
        });
        setFormKey(Date.now());
      } catch (error: any) {
        console.error("Error al agregar estudiante:", error);
        setErrorMessage(
          error.message ||
            "Error de red al agregar el estudiante. Intente más tarde."
        );
      }
    },
    [token, studentData]
  );

  return {
    successMessage,
    errorMessage,
    handleSubmit,
    studentData,
    handleChange,
    formKey,
  };
}
