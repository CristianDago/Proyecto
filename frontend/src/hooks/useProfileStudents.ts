import { useState, useEffect } from "react";
import { fetchStudent, deleteStudent } from "../utils/studentsProfile";
import { Student } from "../interface/student/stundent";
import { toast } from "react-toastify";

export const useStudentProfile = (
  id: string | undefined,
  token: string | undefined
) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<Student | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !token) return;
      try {
        const data = await fetchStudent(id, token);
        setStudent(data);
        setUpdatedData(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      }
    };

    fetchData();
  }, [id, token]);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { name: keyof Student; value: any }
  ) => {
    if (!updatedData) return;
    if ("target" in e) {
      const { name, value, type } = e.target;
      if (type === "file") {
        const inputElement = e.target as HTMLInputElement;
        setUpdatedData({
          ...updatedData,

          [name]: inputElement.files?.[0] || null,
        });
      } else {
        setUpdatedData({ ...updatedData, [name]: value });
      }
    } else {
      setUpdatedData({ ...updatedData, [e.name]: e.value });
    }
  };

  const handleDeleteFile = (fieldName: keyof Student) => {
    if (updatedData) {
      setUpdatedData({
        ...updatedData,

        [fieldName]: null,
      });
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedData || !id || !token) return;
    const formData = new FormData(); // Agregar campos normales y manejar documentos
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value === null) {
        // Campos marcados para eliminación
        formData.append(`${key}_delete`, "true");
      } else if (value instanceof File) {
        // Nuevos archivos
        formData.append(key, value);
      } else if (
        typeof value === "string" &&
        [
          "studentImage",
          "birthCertificate",
          "studyCertificate",
          "linkDni",
        ].includes(key) &&
        value.startsWith("http")
      ) {
        // Mantener URL existente si no ha cambiado
        formData.append(`${key}_url`, value);
      } else if (typeof value !== "object" && value !== undefined) {
        // Valores primitivos
        formData.append(key, String(value));
      }
    });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar estudiante");
      }
      const data = await response.json();
      setStudent(data);
      setUpdatedData(data); // <---- ¡Añade esta línea!
      setIsEditing(false);
      toast.success("Estudiante actualizado con éxito", {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(error.message || "Error inesperado", {
        position: "top-right",
      });
    }
  };

  const handleDelete = async () => {
    if (!id || !token) return;
    if (!window.confirm("¿Estás seguro de eliminar este estudiante?")) return;
    try {
      await deleteStudent(id, token);
      setIsDeleted(true);
      toast.success("Estudiante eliminado con éxito", {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar estudiante", {
        position: "top-right",
      });
    }
  };

  const createDeleteFileEvent = (
    name: string
  ): React.ChangeEvent<HTMLInputElement> => {
    return {
      target: {
        name,
        value: null, // Propiedades requeridas por ChangeEvent<HTMLInputElement>
        files: null,
        checked: undefined,
        valueAsNumber: NaN,
        valueAsDate: null, // Propiedades base de EventTarget
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true, // Propiedades de HTMLInputElement
        accept: "",
        alt: "",
        autocomplete: "",
        defaultChecked: false,
        defaultValue: "",
        dirName: "",
        disabled: false,
        form: null,
        formAction: "",
        formEnctype: "",
        formMethod: "",
        formNoValidate: false,
        formTarget: "",
        height: 0,
        indeterminate: false,
        list: null,
        max: "",
        maxLength: -1,
        min: "",
        minLength: -1,
        multiple: false,
        pattern: "",
        placeholder: "",
        readOnly: false,
        required: false,
        selectionDirection: "forward",
        selectionEnd: null,
        selectionStart: null,
        size: 0,
        src: "",
        step: "",
        type: "file",
        useMap: "",
        width: 0, // Propiedades base de Event
        nativeEvent: new Event("change"),
        currentTarget: {} as HTMLInputElement,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        preventDefault: () => {},
        isDefaultPrevented: () => false,
        stopPropagation: () => {},
        isPropagationStopped: () => false,
        persist: () => {},
        timeStamp: Date.now(),
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
  };

  return {
    student,
    error,
    isEditing,
    updatedData,
    handleEdit,
    handleChange,
    handleSubmitEdit,
    handleDelete,
    isDeleted,
    createDeleteFileEvent,
    handleDeleteFile,
  };
};
