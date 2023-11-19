import { Dialog, DialogContent, Button, TextField } from "@mui/material";
import { signupValidationSchema } from "@/data/schemas";
import { useState } from "react";
import { useFormik } from "formik";
import { AuthButton } from "@/components";
import GoogleIcon from '@mui/icons-material/Google';

interface SignupDialogProps {
  buttonText: string;
}

export const SignupDialog = ({ buttonText }: SignupDialogProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleOpenDialog = () => {
    formik.resetForm();
    setModalIsOpen(true);
  };
  return (
    <>
      <AuthButton
        text={buttonText}
        action={handleOpenDialog}
        variant="contained"
      />
      <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              flexDirection: "column",
              display: "flex",
              padding: "1rem",
              gap: "1rem",
            }}
          >
            <Button startIcon={<GoogleIcon />} variant="outlined" sx={{ borderRadius: 5, fontWeight: 700 }}>Continue with Google</Button>
            <TextField
              hiddenLabel
              name="email"
              id="email"
              placeholder="Email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              hiddenLabel
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              hiddenLabel
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button
              sx={{ borderRadius: 5 }}
              variant="contained"
              disableRipple
              color="primary"
              type="submit"
            >
              Log In
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
