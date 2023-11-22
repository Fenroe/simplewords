import { TextField } from "@mui/material";
import { useField } from "formik";

interface InputProps {
  label: string;
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
};

export const FormTextField = ({ label, ...props }: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};
