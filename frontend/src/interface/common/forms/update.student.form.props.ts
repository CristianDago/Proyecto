import { Student } from "../../student/student";

export interface StudentFormProps {
  student: Student;
  onChange: (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { name: keyof Student; value: File | null }
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDeleteFile: (fieldName: keyof Student) => void;
}
