import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
const InputField = ({ id, label, value, onChange }) => (
  <Grid item xs={12}>
    <TextField
      fullWidth
      name={id}
      label={label}
      id={id}
      autoComplete={`new-${id}`}
      value={value}
      onChange={onChange}
    />
  </Grid>
);
const UserEditComponent = ({ userId }) => {
  const [userData, setUserData] = useState();
  const theme = useTheme();
  const [initialFields, setInitialFields] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`
      )
      .then(({ data }) => {
        setUserData(data);
        setInitialFields({
          first: data.name.first,
          middle: data.name.middle,
          last: data.name.last,
          phone: data.phone,
          url: data.image.url,
          alt: data.image.alt,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        });
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);
  const navigate = useNavigate();
  const handleInputsChange = (e) => {
    setInitialFields((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        {
          phone: initialFields.phone,
          image: {
            url: initialFields.url,
            alt: initialFields.alt,
          },
          name: {
            first: initialFields.first,
            middle: initialFields.middle,
            last: initialFields.last,
          },
          address: {
            state: initialFields.state,
            country: initialFields.country,
            city: initialFields.city,
            street: initialFields.street,
            houseNumber: initialFields.houseNumber,
            zip: +initialFields.zip,
          },
        }
      );
      toast.success("🎉 profile edited successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode.toLowerCase(),
      });
      navigate(-1);
    } catch (err) {
      console.log("err", err);
    }
  };
  const fieldNames = [
    "first",
    "middle",
    "last",
    "phone",
    "url",
    "alt",
    "state",
    "country",
    "city",
    "street",
    "houseNumber",
    "zip",
  ];
  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        Edit user
      </Typography>{" "}
      <Grid container spacing={2}>
        {fieldNames.map((fieldName) => (
          <InputField
            key={fieldName}
            id={fieldName}
            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            value={initialFields[fieldName]}
            onChange={handleInputsChange}
          />
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            onClick={handleSaveChanges}
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs onClick={() => navigate(ROUTES.PROFILE)}>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              ml: "0%",
              bgcolor: "navy",
              color: "gray",
            }}
          >
            Discard Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserEditComponent;
