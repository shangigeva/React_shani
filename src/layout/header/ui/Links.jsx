import { Box } from "@mui/material";
import React from "react";
import nextKey from "generate-my-key";
import myLinks, {
  loggedInLinks,
  loggedOutLinks,
  isAdmin,
  isBusiness,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";
const Links = () => {
  const loggedIn = useSelector((bigPie) => bigPie.auth.loggedIn);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  return (
    <Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {/* //regular user */}
        {loggedIn && !userData.isAdmin && !userData.isBusiness
          ? loggedInLinks.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={nextKey()}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
        {/* //buisness user */}
        {loggedIn && !userData.isAdmin && userData.isBusiness
          ? isBusiness.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={nextKey()}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
        {/* //admin user */}
        {loggedIn && userData.isAdmin
          ? isAdmin.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={nextKey()}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
        {/* //loggedOut */}
        {!loggedIn &&
          loggedOutLinks.map((myItem) => (
            <NavLinkComponent to={myItem.to} key={nextKey()}>
              {myItem.children}
            </NavLinkComponent>
          ))}
      </Box>
    </Box>
  );
};

export default Links;
