import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { LoginDialog } from "@/modules";
import { SWButton } from "@/components";
import { useNavigate } from "react-router";

export const Landing = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  }

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
            <Box display={"flex"} gap={2}>
              <LoginDialog />
              <SWButton variant="contained" text="Get Started" action={handleSignup}/>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container
          sx={{ display: "flex", alignItems: "center", minHeight: "70vh" }}
        >
          <Box
            flex={1}
            sx={{ p: 1 }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Hello world
              </Typography>
              <Typography variant="h5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
              </Typography>
            </Box>
            <SWButton variant="contained" text="Get Started" />
          </Box>
          <Box flex={1} sx={{ p: 1 }}>
            <img
              src="/homepage-hero-2.avif"
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Security As A Service
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};