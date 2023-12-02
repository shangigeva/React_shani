import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  loggedOutLinksFooter,
  isBuisnessFooter,
  loggedInLinksFooter,
  isAdminFooter,
} from "../../myLinks";

const Links = () => {
  const loggedIn = useSelector((bigPie) => bigPie.auth.loggedIn);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const navigate = useNavigate();
  const [value, setValue] = useState("/favoriteCardPage");
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <BottomNavigation value={currentPath} showLabels>
      {/* admin */}
      {loggedIn && userData.isAdmin
        ? isAdminFooter.map((myItem, index) => (
            <BottomNavigationAction
              label={myItem.children}
              value={myItem.to}
              icon={myItem.icon}
              onClick={() => navigate(myItem.to)}
              key={index}
            />
          ))
        : null}
      {/* regular user */}
      {loggedIn && !userData.isAdmin && !userData.isBusiness
        ? loggedInLinksFooter.map((myItem, index) => (
            <BottomNavigationAction
              label={myItem.children}
              value={myItem.to}
              icon={myItem.icon}
              onClick={() => navigate(myItem.to)}
              key={index}
            />
          ))
        : null}
      {/* buisness user */}
      {loggedIn && !userData.isAdmin && userData.isBusiness
        ? isBuisnessFooter.map((myItem, index) => {
            return (
              <BottomNavigationAction
                label={myItem.children}
                value={myItem.to}
                icon={myItem.icon}
                onClick={() => navigate(myItem.to)}
                key={index}
              />
            );
          })
        : null}
      {!loggedIn &&
        loggedOutLinksFooter.map((myItem, index) => (
          <BottomNavigationAction
            label={myItem.children}
            value={myItem.to}
            icon={myItem.icon}
            onClick={() => navigate(myItem.to)}
            key={index}
          />
        ))}
    </BottomNavigation>
  );
};

export default Links;
