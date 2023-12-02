import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const LinksDrawer = ({ links }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLinkClick = (to) => {
    navigate(to);
    handleDrawerClose();
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "auto" },
        }}
      >
        <Box
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            {links.map((link) => (
              <ListItem
                button
                key={link.to}
                onClick={() => handleLinkClick(link.to)}
              >
                <ListItemText primary={link.children} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LinksDrawer;
