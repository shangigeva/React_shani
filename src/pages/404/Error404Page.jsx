import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={handleButtonClick}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="/assets/imgs/404img.jpg"
              alt="404 image"
              width={500}
              height={300}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Error404Page;
