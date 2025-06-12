import React from "react";
import { Student } from "./student";

export interface AddStudentFormProps {
  studentData: Student;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
