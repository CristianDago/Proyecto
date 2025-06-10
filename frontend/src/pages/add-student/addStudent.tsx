import React, { useEffect } from "react";
import { AddStudentForm } from "../../components/common/forms/add-student/addStudentForm";
import { useAuth } from "../../components/auth/authContext";
import { useAddStudent } from "../../hooks/useAddStudents";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStudent() {
  const { token } = useAuth();
  const {
    successMessage,
    errorMessage,
    handleSubmit,
    studentData,
    handleChange,
    formKey, // Obtener formKey del hook
  } = useAddStudent(token || "");

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { position: "top-right", autoClose: 5000 });
    }
    if (errorMessage) {
      toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
    }
  }, [successMessage, errorMessage]);

  if (!token) {
    return (
      <div>
        <h1>Agregar Estudiante</h1>
        <p style={{ color: "red" }}>
          No estás autenticado. Inicia sesión para agregar estudiantes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Agregar Estudiante</h1>
      <AddStudentForm
        key={formKey} // Usar formKey como clave
        studentData={studentData}
        handleChange={handleChange}
        handleSubmit={handleAddStudent}
      />
    </div>
  );
}
