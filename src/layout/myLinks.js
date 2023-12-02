import ROUTES from "../routes/ROUTES";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.FAVCARD, children: "Favorites" },
  { to: ROUTES.CARDS, children: "My Cards" },
];
// no user
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Sign up" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.HOME, children: "Home page" },
];
// regular user
const loggedInLinks = [
  { to: ROUTES.FAVCARD, children: "Favorites" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.HOME, children: "Home page" },
];

// buisness user
const isBusiness = [
  ...loggedInLinks,
  { to: ROUTES.CARDS, children: "My Cards" },
  { to: ROUTES.CREATECARD, children: "Create card" },
];
// admin user
const isAdmin = [...isBusiness];
// Footer
// regular user
const loggedInLinksFooter = [
  { to: ROUTES.FAVCARD, children: "Favorites", icon: <FavoriteIcon /> },
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
];
// no user
const loggedOutLinksFooter = [
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
];
// buisness user
const isBuisnessFooter = [
  { to: ROUTES.FAVCARD, children: "Favorites", icon: <FavoriteIcon /> },
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
  { to: ROUTES.CARDS, children: "My cards", icon: <AccountBoxIcon /> },
];
// admin user
const isAdminFooter = [
  { to: ROUTES.FAVCARD, children: "Favorites", icon: <FavoriteIcon /> },
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
  { to: ROUTES.CARDS, children: "My cards", icon: <AccountBoxIcon /> },
];
export default myLinks;
export {
  myLinks,
  isBuisnessFooter,
  isBusiness,
  loggedInLinks,
  loggedOutLinks,
  loggedOutLinksFooter,
  isAdminFooter,
  isAdmin,
  loggedInLinksFooter,
};
