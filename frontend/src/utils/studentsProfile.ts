import { Student } from "../interface/student/stundent";

// Get student
export const fetchStudent = async (id: string, token: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los datos del estudiante");
  }

  return response.json();
};

// Update student
export const updateStudent = async (
  id: string,
  token: string,
  updatedData: Student
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar el estudiante");
  }

  return response.json();
};

// Delete student
export const deleteStudent = async (id: string, token: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar el estudiante");
  }
  return response.json();
};
