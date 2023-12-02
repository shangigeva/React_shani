import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import CardDetailsComponent from "../../components/CardDetailsComponent";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
      )
      .then(({ data }) => {
        setCardDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching card details:", error);
      });
  }, [cardId]);

  if (!cardDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        Card Details
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "500px" }}>
        <CardDetailsComponent
          _id={cardDetails._id}
          title={cardDetails.title}
          subTitle={cardDetails.subtitle}
          phone={cardDetails.phone}
          email={cardDetails.email}
          description={cardDetails.description}
          address={`${cardDetails.address.country}, ${cardDetails.address.city}, ${cardDetails.address.street} ${cardDetails.address.houseNumber}`}
          img={cardDetails.image.url}
          alt={cardDetails.image.alt}
          createdAt={cardDetails.createdAt}
        />
      </Box>
    </Container>
  );
};
export default CardDetailsPage;
