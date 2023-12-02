import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { normalizeData } from "./normalizeData";
import { validateRegister } from "../../validation/registerValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { useTheme } from "@mui/material/styles";
const RegisterPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: false,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  const handleIsBusiness = () => {
    setInputsValue((currentState) => ({
      ...currentState,
      isBusiness: !currentState.isBusiness,
    }));
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const errors = validateRegister(inputsValue);
      setValidationErrors(errors);
      if (errors) {
        const newErrors = errors.details.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setValidationErrors(newErrors);
        return;
      }
      setValidationErrors({});
      let request = normalizeData(inputsValue);
      const { data } = await axios.post("/users", request);
      navigate("/login");
      toast.success("Registration successful! Please log in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode.toLowerCase(),
      });
    } catch (err) {
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode.toLowerCase(),
      });
      console.error(err);
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {[
            {
              id: "first",
              autoFocus: true,
              autoComplete: "given-name",
              name: "first",
              label: "First Name",
              value: inputsValue.first,
              helperText: validationErrors.first,
            },
            {
              autoComplete: "middle-name",
              autoFocus: true,
              name: "middle",
              id: "middle",
              label: "Middle Name",
              value: inputsValue.middle,
              helperText: validationErrors.middle,
            },
            {
              autoFocus: true,
              id: "last",
              label: "Last Name",
              name: "last",
              autoComplete: "family-name",
              value: inputsValue.last,
              helperText: validationErrors.last,
            },
            {
              autoFocus: true,
              id: "email",
              label: "Email Address",
              name: "email",
              autoComplete: "email",
              value: inputsValue.email,
              helperText: validationErrors.email,
            },
            {
              autoFocus: true,
              name: "password",
              label: "Password",
              type: "password",
              id: "password",
              autoComplete: "new-password",
              value: inputsValue.password,
              helperText: validationErrors.password,
            },
            {
              autoFocus: true,
              name: "phone",
              label: "Phone",
              id: "phone",
              autoComplete: "new-phone",
              value: inputsValue.phone,
              helperText: validationErrors.phone,
            },
            {
              autoFocus: true,
              name: "url",
              label: "Url",
              id: "url",
              autoComplete: "new-url",
              value: inputsValue.url,
            },
            {
              autoFocus: true,
              name: "alt",
              label: "Alt",
              id: "alt",
              autoComplete: "new-alt",
              value: inputsValue.alt,
            },
            {
              autoFocus: true,
              name: "state",
              label: "State",
              id: "state",
              autoComplete: "new-state",
              value: inputsValue.state,
            },
            {
              autoFocus: true,
              name: "country",
              label: "Country",
              id: "country",
              autoComplete: "new-country",
              value: inputsValue.country,
              helperText: validationErrors.country,
            },
            {
              autoFocus: true,
              name: "city",
              label: "City",
              id: "city",
              autoComplete: "new-city",
              value: inputsValue.city,
              helperText: validationErrors.city,
            },
            {
              autoFocus: true,
              name: "street",
              label: "Street",
              id: "street",
              autoComplete: "new-street",
              value: inputsValue.street,
              helperText: validationErrors.street,
            },
            {
              autoFocus: true,
              name: "houseNumber",
              label: "House Number",
              id: "houseNumber",
              autoComplete: "new-houseNumber",
              value: inputsValue.houseNumber,
              helperText: validationErrors.houseNumber,
            },
            {
              autoFocus: true,
              name: "zip",
              label: "Zip",
              id: "zip",
              autoComplete: "new-zip",
              value: inputsValue.zip,
            },
          ].map((field) => (
            <Grid item xs={12} sm={12} key={field.id}>
              <TextField
                onChange={handleInputsChange}
                fullWidth
                required={[
                  "first",
                  "last",
                  "phone",
                  "email",
                  "password",
                  "url",
                  "alt",
                  "country",
                  "city",
                  "street",
                  "houseNumber",
                ].includes(field.id)}
                {...field}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Business Account"
              checked={inputsValue.isBusiness}
              onClick={handleIsBusiness}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link onClick={() => navigate(ROUTES.LOGIN)} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default RegisterPage;
