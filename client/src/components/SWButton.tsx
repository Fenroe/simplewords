import { Button } from "@mui/material";

interface SWButtonProps {
  variant: "text" | "outlined" | "contained";
  text: string;
  action?: () => void;
  type?: "button" | "reset" | "submit";
  fullWidth?: boolean;
}

export const SWButton = ({
  variant,
  text,
  action,
  type,
  fullWidth,
}: SWButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={action}
      sx={{
        borderRadius: 5,
        fontWeight: 700,
      }}
      fullWidth={fullWidth}
      type={type}
    >
      {text}
    </Button>
  );
};
