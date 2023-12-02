import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Links from "./ui/Links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import FilterComponent from "./ui/FilterComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LinksDrawer from "../../components/LinksDrawer";
import { isAdmin, isBusiness, loggedInLinks, loggedOutLinks } from "../myLinks";
const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const loggedIn = useSelector((bigPie) => bigPie.auth.loggedIn);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const handleThemeChange = (event) => {
    onThemeChange(isDarkTheme);
    if (userData) {
      localStorage.setItem(
        `theme_${userData._id}`,
        isDarkTheme ? "light" : "dark"
      );
    } else {
      localStorage.setItem(`theme`, isDarkTheme ? "light" : "dark");
    }
  };

  const handleMenu = (item) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if (item === "Profile") {
      navigate("/profile");
    } else if (item === "User list") {
      navigate("/list");
    } else if (item === "Logout") {
      localStorage.removeItem("token");
      navigate("");
      window.location.reload();
    }
  };
  const [user, setUser] = useState();

  useEffect(() => {
    if (loggedIn && userData) {
      axios
        .get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData._id}`
        )
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.error("Error fetching user data", err);
        });
    }
  }, [loggedIn, userData]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenu("Profile");
        }}
      >
        Profile
      </MenuItem>
      {loggedIn && userData.isAdmin && (
        <MenuItem
          onClick={() => {
            handleMenu("User list");
          }}
        >
          User list
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          handleMenu("Logout");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <LinksDrawer
            links={
              loggedIn
                ? userData.isAdmin
                  ? isAdmin
                  : userData.isBusiness
                  ? isBusiness
                  : loggedInLinks
                : loggedOutLinks
            }
          />
          <img
            src="/assets/imgs/logo.png"
            alt="Profile"
            style={{
              width: "50px",
              borderRadius: "50%",
            }}
          />
          <Links />
          <FilterComponent />
          <Box sx={{ marginRight: "0" }}>
            <IconButton onClick={handleThemeChange}>
              <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {loggedIn && (
            <Typography variant="h6" sx={{ fontSize: "0.7rem" }}>
              Hey, {user?.name.first}
            </Typography>
          )}
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {userData && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default HeaderComponent;
