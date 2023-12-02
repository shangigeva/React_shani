import { Link, Typography } from "@mui/material";

const CopyrightComponent = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {" "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyrightComponent;
