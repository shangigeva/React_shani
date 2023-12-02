import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user._id}>
          <ListItemText primary={user.name.first} />
          <ListItemText primary={user.name.last} />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteUser(user._id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
