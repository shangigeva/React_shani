import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import tmc from "twin-moon-color";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import FooterComponent from "./footer/FooterComponent";

const LayoutComponent = ({ children }) => {
  const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.darkTheme);
  const dispatch = useDispatch();

  const themes = tmc({
    "text.headerColor": "!#001B79",
    "text.headerActive": "#1640D6",
    primary: "#0174BE",
  });

  const darkTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const handleThemeChange = (checked) => {
    dispatch(darkThemeActions.changeTheme());
  };
  let initialTheme;
  if (userData) {
    initialTheme =
      localStorage.getItem(`theme_${userData._id}`) === "dark"
        ? "dark"
        : "light";
  } else {
    initialTheme = localStorage.getItem(`theme`) === "dark" ? "dark" : "light";
  }

  return (
    <ThemeProvider theme={initialTheme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={initialTheme === "dark" ? true : false}
        onThemeChange={handleThemeChange}
      />
      <MainComponent>{children}</MainComponent>
      <FooterComponent />
    </ThemeProvider>
  );
};

export default LayoutComponent;
