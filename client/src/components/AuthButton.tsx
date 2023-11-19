import { Button } from "@mui/material";

interface AuthButtonProps {
    variant: "text" | "outlined" | "contained";
    text: string;
    action: () => void;
}

export const AuthButton = ({ variant, text, action } : AuthButtonProps ) => {
  return (
    <Button
      variant={variant}
      onClick={action}
      sx={{ borderRadius: 5, maxWidth: "max-content", fontWeight: 700 }}
    >
      {text}
    </Button>
  );
};
