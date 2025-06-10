import { Student } from "../interface/student/stundent";

// Add student
export const addStudent = async (token: string, studentData: Student) => {
  // Verificar si el token es válido
  if (!token) {
    throw new Error("Token no válido o no presente");
  }

  // Iniciar la solicitud
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studentData),
    }
  );

  // Verificar si la respuesta fue correcta
  if (!response.ok) {
    // Capturamos el error detallado de la respuesta
    const errorBody = await response.text();
    console.error("Error de la API:", errorBody); // Mostrar el error detallado
    throw new Error("Error al agregar el estudiante");
  }

  // Devolver el resultado en formato JSON
  return response.json();
};

// Fetch students list (sin cambios)
const fetchStudentsList = async (token: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los estudiantes");
  }

  return await response.json();
};

export default fetchStudentsList;
