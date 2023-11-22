import { Typography, Box, Container } from "@mui/material";
import { Header } from "@/modules";
import { SWButton } from "@/components";

export const Landing = () => {
  return (
    <div>
      <Header />
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
    </div>
  );
};
