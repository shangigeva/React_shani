import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { useTheme } from "@mui/material/styles";
const InputField = ({ id, label, value, onChange }) => (
  <Grid item>
    <TextField
      id={id}
      fullWidth
      label={label}
      variant="outlined"
      sx={{ mt: "10px" }}
      onChange={onChange}
      value={value}
    />
  </Grid>
);
const CardEditComponent = ({ _id }) => {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState();
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
  useEffect(() => {
    axios
      .get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
      )
      .then(({ data }) => {
        setCardData(data);
        setInputValue({
          title: data.title,
          subtitle: data.subtitle,
          phone: data.phone,
          email: data.email,
          description: data.description,
          web: data.web,
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
        console.log("Error fetching card details:", err);
      });
  }, []);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleUpdateChangesClick = async () => {
    try {
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {
          title: inputsValue.title,
          subtitle: inputsValue.subtitle,
          description: inputsValue.description,
          email: inputsValue.email,
          web: inputsValue.web,
          phone: inputsValue.phone,
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
        }
      );
      navigate(`${ROUTES.DETAILS}/${_id}`);
      toast.success("🎉 card edited successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode.toLowerCase(),
      });
    } catch (error) {}
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
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Card - Edit
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put a new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <Grid container flexDirection="column">
          {fieldNames.map((fieldName) => (
            <InputField
              key={fieldName}
              id={fieldName}
              label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              value={inputsValue[fieldName]}
              onChange={handleInputChange}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
            onClick={handleUpdateChangesClick}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
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
          </Link>
        </Grid>
      </Grid>
      <Paper elevation={1} variant="elevation"></Paper>
    </Container>
  );
};
export default CardEditComponent;
