import { Dialog, DialogContent, TextField } from "@mui/material";
import { loginValidationSchema } from "@/data/schemas";
import { useState } from "react";
import { useFormik } from "formik";
import { SWButton } from "@/components";

export const LoginDialog = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
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
      <SWButton
        text="Log in"
        action={handleOpenDialog}
        variant="outlined"
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
            <SWButton type="submit" text="Log in" variant="contained" />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
