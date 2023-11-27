import { Box, Grid, Typography, Button, Card } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Grid item xs={6}>
        <Card
          sx={{
            p: 2,
            bgcolor: "#2c2f33",
            color: "#fff5fa",
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          <Typography>You haven't added anything yet</Typography>
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            sx={{
              bgcolor: "#ff971d",
              fontWeight: 700,
              color: "#fff5fa",
              mt: 2,
            }}
          >
            Add Credential
          </Button>
        </Card>
      </Grid>
    </Box>
  );
};
