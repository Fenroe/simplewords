import { Formik } from "formik";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  getPassword: (
    length: number,
    uppercase: boolean,
    numbers: boolean,
    special: boolean
  ) => string;
  lengthMin: number;
  lengthMax: number;
  lengthDefault: number;
}

export const GetPasswordForm = ({
  getPassword,
  lengthMin,
  lengthMax,
  lengthDefault,
}: Props) => {
  const [passphrase, setPassphrase] = useState<string>(
    getPassword(lengthDefault, false, false, false)
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [copiedAlert, setCopiedAlert] = useState<boolean>(false);

  const triggerCopiedAlert = () => {
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, 5000);
  };

  const copyPassphrase = () => {
    if (passphrase === "") return;
    navigator.clipboard.writeText(passphrase);
    triggerCopiedAlert();
  };

  return (
    <Formik
      initialValues={{
        uppercase: false,
        numbers: false,
        special: false,
        length: lengthDefault,
      }}
      onSubmit={async (values) => {
        try {
          if (loading) return;
          setLoading(true);
          const { length, uppercase, numbers, special } = values;
          const passphrase: string = getPassword(
            length,
            uppercase,
            numbers,
            special
          );
          setPassphrase(passphrase);
          setCopiedAlert(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <TextField
              multiline
              hiddenLabel
              fullWidth
              size="small"
              value={passphrase}
              inputProps={{ style: { textAlign: "center" } }}
              sx={{
                bgcolor: "#fff5fa",
                borderRadius: 10,
                textAlign: "center",
              }}
            />
          </Box>
          <Box>
            <FormControlLabel
              name="uppercase"
              checked={formik.values.uppercase}
              onChange={(evt) => {
                formik.handleChange(evt);
                formik.handleSubmit();
              }}
              control={<Checkbox />}
              label="Uppercase"
            />
            <FormControlLabel
              name="numbers"
              checked={formik.values.numbers}
              onChange={(evt) => {
                formik.handleChange(evt);
                formik.handleSubmit();
              }}
              control={<Checkbox />}
              label="Numbers"
            />
            <FormControlLabel
              name="special"
              checked={formik.values.special}
              onChange={(evt) => {
                formik.handleChange(evt);
                formik.handleSubmit();
              }}
              control={<Checkbox />}
              label="Special characters"
            />
          </Box>
          <Box>
            <InputLabel sx={{ color: "#fff5fa" }}>Password Length</InputLabel>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  name="length"
                  min={lengthMin}
                  max={lengthMax}
                  value={formik.values.length}
                  onChange={(evt) => {
                    formik.handleChange(evt);
                    formik.handleSubmit();
                  }}
                />
              </Grid>
              <Grid item>
                <Typography>{formik.values.length}</Typography>
              </Grid>
            </Grid>
          </Box>
          <ButtonGroup
            sx={{ display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={copyPassphrase}
              sx={{
                bgcolor: "#ff971d",
                fontWeight: 700,
                color: "#fff5fa",
                mt: 2,
              }}
            >
              {copiedAlert ? "Copied" : "Copy Password"}
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#ff971d",
                fontWeight: 700,
                color: "#fff5fa",
                mt: 2,
              }}
            >
              Create Passphrase
            </Button>
          </ButtonGroup>
        </form>
      )}
    </Formik>
  );
};
