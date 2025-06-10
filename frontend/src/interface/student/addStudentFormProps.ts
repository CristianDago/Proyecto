import React from "react";
import { Student } from "./stundent";

export interface AddStudentFormProps {
  studentData: Student;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
