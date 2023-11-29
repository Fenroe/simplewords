import { PageWrapper } from "@/components";
import { Card, Container, FormControl, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const New = () => {
  const [searchParams, setSearchParams] = useSearchParams({ type: "" });
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
          <FormControl fullWidth>
            <Select
              displayEmpty
              renderValue={(value) => {
                if (value === "account") {
                  return "Account";
                }
                if (value === "address") {
                  return "Address";
                }
                if (value === "contact") {
                  return "Contact";
                }
                if (value === "file") {
                  return "File";
                }
                return "Select Type";
              }}
              value={searchParams.get("type")}
              onChange={(evt) =>
                setSearchParams((prev) => {
                  prev.set("type", evt.target.value as string);
                  return prev;
                })
              }
            >
              <MenuItem value="account">Account</MenuItem>
              <MenuItem value="address">Address</MenuItem>
              <MenuItem value="contact">Contact</MenuItem>
              <MenuItem value="file">File</MenuItem>
            </Select>
          </FormControl>
        </Card>
      </Container>
    </PageWrapper>
  );
};
