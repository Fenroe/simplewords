import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useState } from "react";

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ top: 0, bgcolor: "#fcfcfc" }}
        elevation={0}
      >
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography
                variant="h6"
                component="div"
                color="primary"
                sx={{ flexGrow: 1, fontWeight: 700 }}
              >
                simple<span style={{ fontWeight: 400 }}>words</span>
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container
          sx={{ display: "flex", justifyContent: "center" }} 
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Container>
      </Box>
    </>
  );
};
