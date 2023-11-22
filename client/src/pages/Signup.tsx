import { Header } from "@/modules";
import { Box, Container } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { FormTextField, SWButton } from "@/components";
import { sendPostRequest } from "@/utilities";

const signupValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(10, "Your password is too short")
    .required("This field is required"),
});

export const Signup = () => {
  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      return await sendPostRequest(values, "http://localhost:8000/api/auth/signup");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Header />
      <Box>
        <Container sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={signupValidationSchema}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <FormTextField
                  name="email"
                  type="email"
                  label="Enter your email address"
                />
                <FormTextField
                  name="password"
                  type="password"
                  label="Enter a master password"
                />
                <SWButton
                  type="submit"
                  text="Sign up"
                  variant="contained"
                  fullWidth
                />
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </div>
  );
};
