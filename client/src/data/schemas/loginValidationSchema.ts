import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(7, "Your password should contain at least 7 characters")
    .required("This field is required"),
});
