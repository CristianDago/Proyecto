export default interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormInputProps {
  id?: string;
  name: string;
  label: string;
  type: string;
  value?: string; // Hacerlo opcional para inputs tipo "file"
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  options?: string[]; // Para selects
  accept?: string; // Para input de tipo "file"
}
