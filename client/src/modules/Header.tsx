import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { LoginDialog } from ".";
import { SWButton } from "@/components";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, bgcolor: "#fcfcfc" }} elevation={0}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Link href="/" underline="none">
              <Typography
                variant="h6"
                component="div"
                color="primary"
                sx={{ flexGrow: 1, fontWeight: 700 }}
              >
                simple<span style={{ fontWeight: 400 }}>words</span>
              </Typography>
            </Link>
          </Box>
          <Box display={"flex"} gap={2}>
            <LoginDialog />
            <SWButton
              variant="contained"
              text="Get Started"
              action={handleSignup}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
