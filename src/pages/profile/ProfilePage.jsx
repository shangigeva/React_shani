import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Button, List, ListItem } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const ProfilePage = () => {
  const authState = useSelector((state) => state.auth);
  const [user, setUser] = useState();
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: 4,
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        User Profile
      </Typography>
      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "50%",
            }}
          >
            <List sx={{ fontSize: "0.8rem" }}>
              <ListItem>First Name: {user.name.first}</ListItem>
              <ListItem>Middle Name: {user.name.middle}</ListItem>
              <ListItem>Last Name: {user.name.last}</ListItem>
              <ListItem>Email: {user.email}</ListItem>
              <ListItem>Phone: {user.phone}</ListItem>
              <ListItem>State: {user.address.state}</ListItem>
              <ListItem>Country: {user.address.country}</ListItem>
              <ListItem>City: {user.address.city}</ListItem>
              <ListItem>Street: {user.address.street}</ListItem>
              <ListItem>House Number: {user.address.houseNumber}</ListItem>
              <ListItem>Zip: {user.address.zip}</ListItem>
            </List>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Avatar
              alt="User Profile"
              src={user.image.url}
              sx={{
                width: "10rem",
                height: "10rem",
                marginBottom: 2,
              }}
            />
            <Button onClick={() => navigate(ROUTES.EDITMYPROFILE)}>EDIT</Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No user found</Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
