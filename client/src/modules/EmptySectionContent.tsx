import { Button, Card, Container, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router";

interface Props {
  section?: "all" | "accounts" | "files" | "addresses" | "contacts";
}

const buttonTextValues = {
  all: "Add Something",
  accounts: "Add account",
  files: "Add file",
  addresses: "Add address",
  contacts: "Add contact",
};

export const EmptySectionContent = ({ section = "all" }: Props) => {
  const navigate = useNavigate();

  return (
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
          You haven't added any{section === "all" ? "thing" : ` ${section}`} yet
        </Typography>
        <Button
          onClick={() =>
            navigate(`/new${section === "all" ? "" : `?type=${section}`}`)
          }
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          sx={{
            bgcolor: "#ff971d",
            fontWeight: 700,
            color: "#fff5fa",
            mt: 2,
          }}
        >
          {buttonTextValues[section]}
        </Button>
      </Card>
    </Container>
  );
};
