import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import homePageNormalization from "../home/homePageNormalization";
import { Container, Box, Typography, Grid } from "@mui/material";

const FavoriteCardPage = () => {
  const [likedCards, setLikedCards] = useState([]);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  useEffect(() => {
    axios
      .get(`/cards`)
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);

        const updatedLike = data.filter((card) => card.isLiked);
        setLikedCards(updatedLike);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Box
      sx={{
        margin: "auto",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "100vh",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        Favorites Cards
      </Typography>
      <Container>
        {likedCards.length === 0 ? (
          <Typography variant="body1">
            You don't have any favorite cards. If you want to add cards, please
            click the 'Like' button on the card.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {likedCards.map((card, index) => (
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
                  like={true}
                  userId={card.user_id}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteCardPage;
