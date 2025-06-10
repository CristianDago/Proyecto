import { useState, ChangeEvent, FormEvent } from "react";
import { Student } from "../interface/student/stundent";
import { DateTime } from "luxon";

export function useAddStudent(token: string) {
  const [formKey, setFormKey] = useState(Date.now()); // Añadir esta línea
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const inputElement = e.target as HTMLInputElement;
      setStudentData({ ...studentData, [name]: inputElement.files?.[0] });
    } else if ((name === "birthdate" || name === "contactDate") && value) {
      const formattedDate = DateTime.fromISO(value, {
        zone: "America/Santiago",
      }).isValid
        ? DateTime.fromISO(value, { zone: "America/Santiago" }).toISODate()
        : "";
      setStudentData({ ...studentData, [name]: formattedDate });
    } else if (value === "undefined") {
      setStudentData({ ...studentData, [name]: undefined });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage("No estás autenticado.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    for (const key in studentData) {
      const value = (studentData as any)[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/students`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json(); // Mover esto fuera del if

      if (response.ok) {
        setSuccessMessage("Estudiante agregado con éxito");
        // Resetear los datos del estudiante
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
        // Cambiar la clave para forzar el remontaje del formulario
        setFormKey(Date.now());
      } else {
        // Manejo mejorado de errores
        if (responseData.error && responseData.error.includes("teléfono")) {
          setErrorMessage(responseData.error);
        } else if (responseData.message) {
          setErrorMessage(responseData.message);
        } else {
          setErrorMessage("No se pudo agregar el estudiante");
        }
      }
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      setErrorMessage("Error de red al agregar el estudiante");
    }
  };

  return {
    successMessage,
    errorMessage,
    handleSubmit,
    studentData,
    handleChange,
    formKey, // Añadir formKey a los valores retornados
  };
}
