import { useCallback } from "react";
import { Student } from "../interface/student/student";
import {
  UseDocumentHandlingHookProps,
  UseDocumentHandlingHookResult,
} from "../interface/hooks/document.handling";

export const useDocumentHandling = ({
  onChange,
  onDeleteFile,
}: UseDocumentHandlingHookProps): UseDocumentHandlingHookResult => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files.length > 0) {
        onChange({ name: name as keyof Student, value: files[0] });
      }
    },
    [onChange]
  );

  const handleDeleteFile = useCallback(
    (fieldName: keyof Student) => {
      if (
        window.confirm(
          `¿Estás seguro de eliminar ${getLabelForField(
            fieldName
          ).toLowerCase()}?`
        )
      ) {
        onDeleteFile(fieldName);
      }
    },
    [onDeleteFile]
  );

  const getLabelForField = useCallback((fieldName: keyof Student): string => {
    switch (fieldName) {
      case "studentImage":
        return "Foto del Estudiante";
      case "birthCertificate":
        return "Certificado de nacimiento";
      case "studyCertificate":
        return "Certificado de estudio";
      case "linkDni":
        return "Cédula de identidad";
      default:
        return "";
    }
  }, []);

  return { handleFileChange, handleDeleteFile, getLabelForField };
};
