import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "@/hooks";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";

export const Layout = () => {
  const account = useAppSelector((state) => state.account);

  const navigate = useNavigate();

  return (
    <div>
      {account.id === null ? (
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <Grid
            container
            columns={12}
            sx={{ bgcolor: "#0f1113" }}
            gap={2}
            flexWrap="nowrap"
          >
            <Grid
              item
              xs={3}
              sx={{
                height: "100vh",
                position: "sticky",
                top: 0,
                bgcolor: "#22282c",
              }}
            >
              <Box
                sx={{
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Link href="/" underline="none">
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 700, color: "#fffaf5" }}
                  >
                    simple<span style={{ color: "#ff971d" }}>words</span>
                  </Typography>
                </Link>
              </Box>
              <Divider sx={{ bgcolor: "#fffaf5" }} />
              <Box>
                <List>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/")}
                    >
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Home</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/accounts")}
                    >
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Accounts</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/secrets")}
                    >
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Secrets</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/files")}
                    >
                      <ListItemIcon>
                        <DescriptionOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Files</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/addresses")}
                    >
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Addresses</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/contacts")}
                    >
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Contacts</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
              <Divider sx={{ bgcolor: "#fffaf5" }} />
              <Box>
                <List>
                  <ListItem sx={{ color: "#fffaf5" }} disableGutters>
                    <ListItemButton
                      disableRipple
                      disableTouchRipple
                      onClick={() => navigate("/generator")}
                    >
                      <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: "#fffaf5" }} />
                      </ListItemIcon>
                      <ListItemText>Password Generator</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddOutlinedIcon />}
                  sx={{ bgcolor: "#ff971d", fontWeight: 700, color: "#fff5fa" }}
                >
                  Add
                </Button>
                <form
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "2rem",
                    paddingRight: "2rem",
                    border: "1px solid #2c2f33",
                    color: "#2c2f33",
                  }}
                >
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon sx={{ color: "#2c2f33" }} />
                  </IconButton>
                  <TextField
                    id="search-bar"
                    className="text"
                    hiddenLabel
                    variant="filled"
                    placeholder="Search..."
                    size="small"
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      color: "#2c2f33",
                      "& .MuiFilledInput-root": {
                        color: "#2c2f33",
                        bgcolor: "inherit",
                        "&:hover": {
                          bgcolor: "inherit",
                        },
                        "&:focus": {
                          bgcolor: "inherit",
                        },
                        "&:focus-within": {
                          bgcolor: "inherit",
                        },
                      },
                    }}
                  />
                </form>
                <Avatar>DS</Avatar>
              </Box>
              <Divider sx={{ bgcolor: "#fffaf5" }} />
              <Outlet />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
