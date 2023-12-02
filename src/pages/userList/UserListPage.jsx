import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useTheme } from "@mui/material/styles";
const itemsPerPage = 10;
const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const handleEditUser = (userId) => {
    navigate(`/editprofile/${userId}`);
  };
  const getUsers = () => {
    axios
      .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users")
      .then(({ data }) => {
        setUsers(data);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleUpgradeUser = (userId) => {
    axios
      .patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`
      )
      .then((response) => {
        toast.success("🎉 User upgraded successfully to a business account!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode.toLowerCase(),
        });
        getUsers();
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode.toLowerCase(),
        });
        console.error("Error upgrading user:", error);
      });
  };
  const handleDeleteUser = (userId) => {
    axios
      .delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`
      )
      .then((response) => {
        toast.success("🎉 User deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode.toLowerCase(),
        });
        getUsers();
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode.toLowerCase(),
        });
        console.error("Error deleting user:", error);
      });
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: 4,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        User list
      </Typography>
      <TableContainer>
        {users.length > 0 && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ color: "#164863" }}>
                  First name
                </TableCell>
                <TableCell align="left" sx={{ color: "#164863" }}>
                  Last name
                </TableCell>
                <TableCell align="left" sx={{ color: "#164863" }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ color: "#164863" }}>
                  Business
                </TableCell>
                <TableCell align="left" sx={{ color: "#164863" }}>
                  Delete
                </TableCell>
                <TableCell align="left" sx={{ color: "#164863" }}>
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(startIndex, endIndex).map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="left">{user.name.first}</TableCell>
                  <TableCell align="left">{user.name.last}</TableCell>
                  <TableCell align="left">{user._id}</TableCell>
                  <TableCell align="left">
                    {user.isBusiness ? (
                      <BusinessCenterIcon />
                    ) : (
                      <>
                        <IconButton
                          edge="end"
                          aria-label="upgrade"
                          onClick={() => handleUpgradeUser(user._id)}
                        >
                          <UpgradeIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>{" "}
                  <TableCell align="left">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditUser(user._id)}
                    >
                      <CreateIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <IconButton
            color="primary"
            aria-label="previous page"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="next page"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
export default UserListPage;
