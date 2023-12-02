import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "2ch",
    [theme.breakpoints.up("md")]: {
      width: "15ch",
      fontSize: "0.8rem",
    },
  },
}));

export default StyledInputBase;
