import { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import { validateCard } from "../../validation/createCardValidation";
import { useTheme } from "@mui/material/styles";
const InputField = ({ id, label, value, onChange, helperText, required }) => (
  <Grid item>
    <TextField
      id={id}
      label={label}
      variant="outlined"
      fullWidth
      sx={{ mt: "10px" }}
      onChange={onChange}
      helperText={helperText}
      value={value}
      required={required}
    />
  </Grid>
);
const CreateCardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    email: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const { id: _id } = useParams();
  const [validationErrors, setValidationErrors] = useState({});
  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  const handleUpdateChangesClick = async (event) => {
    try {
      event.preventDefault();
      const errors = validateCard(inputsValue);
      console.log(errors);
      if (errors) {
        setValidationErrors(errors);
        const newErrors = errors.details.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        console.log(newErrors);
        setValidationErrors(newErrors);
      }
      const { data } = await axios.post("/cards", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.email,
        web: inputsValue.web,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });
      navigate(ROUTES.HOME);
      toast.success("🎉 Card created successfully!", {
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
      console.log("err", err);
    }
  };
  const fieldNames = [
    "title",
    "subtitle",
    "phone",
    "email",
    "description",
    "web",
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
    <Container sx={{ padding: "50px" }}>
      <Typography
        variant="h2"
        sx={{ mb: 1, padding: "10px", pb: "0px", color: "#164863" }}
      >
        create card
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        {fieldNames.map((fieldName) => (
          <InputField
            key={fieldName}
            id={fieldName}
            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            value={inputsValue[fieldName]}
            helperText={validationErrors[fieldName]}
            onChange={handleInputChange}
            required={[
              "title",
              "subtitle",
              "description",
              "email",
              "phone",
              "url",
              "alt",
              "country",
              "city",
              "street",
              "houseNumber",
            ].includes(fieldName)}
          />
        ))}
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, width: "100%", ml: "0%" }}
          onClick={handleUpdateChangesClick}
        >
          CREATE CARD
        </Button>
      </Grid>
      <Paper elevation={1} variant="elevation"></Paper>
    </Container>
  );
};
export default CreateCardPage;
