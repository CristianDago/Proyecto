// hooks/useStudents.ts

import { useEffect, useState } from "react";
import { useAuth } from "../components/auth/authContext";
import fetchStudentsList from "../utils/fetchStudents";
import { Student } from "../interface/student/stundent";

export const useStudents = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Token no proporcionado");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchStudentsList(token);
        setStudents(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { students, error, loading };
};
