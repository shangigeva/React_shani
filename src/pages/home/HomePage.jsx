import { useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
let initialDataFromServer = [];
const itemsPerPage = 8;
const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const query = useQueryParams();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        initialDataFromServer = data;
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    const filteredData = initialDataFromServer.filter((card) =>
      card.title.startsWith(filter)
    );
    setDataFromServer(filteredData);
    setCurrentPage(1);
  }, [query, initialDataFromServer]);

  const handleDeleteCard = (_id) => {
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.filter((card) => card._id !== _id)
    );
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Container>
      <Grid container spacing={2}>
        {dataFromServer.slice(startIndex, endIndex).map((card) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              email={card.email}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              like={card.isLiked}
              countLikes={card.likes.length}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              userId={card.user_id}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <Button
          disabled={endIndex >= dataFromServer.length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {" "}
          <KeyboardDoubleArrowRightIcon />{" "}
        </Button>
      </Grid>
    </Container>
  );
};

export default HomePage;
