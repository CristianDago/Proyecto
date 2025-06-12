// src/interface/hooks/documentHandling.ts
import { Student } from "./student";

export interface UseDocumentHandlingHookResult {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteFile: (fieldName: keyof Student) => void;
  getLabelForField: (fieldName: keyof Student) => string;
}

export interface UseDocumentHandlingHookProps {
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { name: keyof Student; value: File | null }
  ) => void;
  onDeleteFile: (fieldName: keyof Student) => void;
}
