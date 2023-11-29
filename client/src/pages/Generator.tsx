import { PageWrapper } from "@/components";
import { GetPasswordForm } from "@/modules";
import { generatePassphrase, generateRandomPassword } from "@/utilities";
import {
  Box,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const Generator = () => {
  const [passwordType, setPasswordType] = useState<string>("memorable");

  return (
    <PageWrapper>
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 2,
            bgcolor: "#2c2f33",
            color: "#fff5fa",
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          <Typography>
            {" "}
            Need a new password? Use our password generator.
          </Typography>
          <Box>
            <FormControl hiddenLabel sx={{ my: 1 }}>
              <RadioGroup
                defaultValue="memorable"
                value={passwordType}
                onChange={(evt) => setPasswordType(evt.target.value)}
              >
                <FormControlLabel
                  value="random"
                  control={<Radio />}
                  label="Random Password"
                />
                <FormControlLabel
                  value="memorable"
                  control={<Radio />}
                  label="Memorable Passphrase"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {passwordType === "memorable" && (
            <GetPasswordForm
              type="memorable"
              getPassword={generatePassphrase}
              lengthMin={3}
              lengthMax={12}
              lengthDefault={5}
            />
          )}
          {passwordType === "random" && (
            <GetPasswordForm
              type="random"
              getPassword={generateRandomPassword}
              lengthMin={10}
              lengthMax={100}
              lengthDefault={10}
            />
          )}
        </Card>
      </Container>
    </PageWrapper>
  );
};
