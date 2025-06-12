import InputFieldProps from "../common/input.field";

export default interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  emailProps?: InputFieldProps;
  passwordProps?: InputFieldProps;
}
