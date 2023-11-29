import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export const PageWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      {children}
    </Box>
  );
};
