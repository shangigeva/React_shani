import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import homePageNormalization from "../home/homePageNormalization";
import { Box, Container, Grid, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const MyCards = () => {
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();
  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  useEffect(() => {
    axios
      .get(`/cards/my-cards`)
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        setMyCards(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        margin: "auto",
        textAlign: "center",
        // backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        My Cards
      </Typography>{" "}
      {myCards.length === 0 ? (
        <Typography variant="body1" sx={{ marginBottom: 2, color: "#427D9D" }}>
          You don't have any cards. If you're interested in creating a card, you
          can do so on the 'Create Card' page{" "}
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 2, color: "#427D9D" }}>
          View and manage your personalized cards on this page. Each card is
          tailored to your details for easy access and interaction.
        </Typography>
      )}
      <Container>
        <Grid container spacing={2}>
          {myCards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                key={card._id}
                _id={card._id}
                title={card.title}
                subTitle={card.subtitle}
                phone={card.phone}
                address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                img={card.image.url}
                alt={card.image.alt}
                cardNumber={card.cardNumber}
                userId={card.user_id}
                onEditCard={handleEditCard}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyCards;
