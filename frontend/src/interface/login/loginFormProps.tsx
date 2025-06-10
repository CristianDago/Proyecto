import InputFieldProps from "../common/inputField";

export default interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  errorMessage: string | null;
  isLoading: boolean;
  emailProps?: InputFieldProps;
  passwordProps?: InputFieldProps;
}
