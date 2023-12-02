import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useTheme } from "@mui/material/styles";
const CardComponent = ({
  _id,
  title,
  subTitle,
  phone,
  address,
  img,
  alt,
  cardNumber,
  onDeleteCard,
  like,
  countLikes,
  onEditCard,
  userId,
}) => {
  const handlePhoneClick = () => {};
  const theme = useTheme();
  const handleDeleteCardClick = () => {
    axios
      .delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`
      )
      .then(function (response) {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(function (error) {
        toast.error("Unable to delete card", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme.palette.mode.toLowerCase(),
        });
      });
  };
  const handleClickEditCard = () => {
    onEditCard(_id);
  };
  const [isLiked, setIsLiked] = useState(like);
  const [likesCounter, setLikesCounter] = useState(countLikes);
  const loggedIn = useSelector((bigPie) => bigPie.auth.loggedIn);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const navigate = useNavigate();
  const allowedToEdit = () => {
    if (loggedIn) {
      if ((userData.isBusiness && userData._id === userId) || userData.isAdmin)
        return true;
    }
    return false;
  };
  const handleLikedCard = async () => {
    const updatedLike = !isLiked;
    if (loggedIn) {
      try {
        await axios
          .patch(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
            {
              like: updatedLike,
            }
          )
          .then(function (response) {
            if (response.status === 200) {
              setLikesCounter(response.data.likes.length);
              setIsLiked(updatedLike);
            }
          })
          .catch(function (error) {
            toast.error("Like card failed", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: theme.palette.mode.toLowerCase(),
            });
          });
      } catch (error) {
        console.log(error);
        // Handle error
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Card sx={{ width: "300px" }}>
        <CardActionArea onClick={() => navigate(`${ROUTES.DETAILS}/${_id}`)}>
          <CardMedia height={"220px"} component="img" image={img} alt={alt} />
        </CardActionArea>
        <CardContent>
          <CardHeader
            title={title}
            subheader={subTitle}
            sx={{ p: 0, mb: 1, height: "10vh" }}
          />
          <Divider />
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">
              <Typography fontWeight="700" variant="subtitle1" component="span">
                Phone:{" "}
              </Typography>
              {phone}
            </Typography>
            <Typography variant="body2">
              <Typography fontWeight="700" variant="subtitle1" component="span">
                Address:{" "}
              </Typography>
              {address}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <IconButton onClick={handlePhoneClick}>
                <PhoneIcon />
              </IconButton>
              <IconButton
                disabled={!allowedToEdit()}
                onClick={handleClickEditCard}
              >
                <CreateIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                disabled={!allowedToEdit()}
                onClick={handleDeleteCardClick}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                disabled={!loggedIn}
                onClick={handleLikedCard}
                sx={{
                  color: isLiked ? (theme) => theme.palette.error.main : "",
                }}
              >
                <Typography>{likesCounter}</Typography>
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            onClick={() => navigate(`${ROUTES.DETAILS}/${_id}`)}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ fontSize: "0.6rem" }}
            >
              Read More
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  email: PropTypes.string,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  like: PropTypes.bool,
  countLikes: PropTypes.number,
  onEditCard: PropTypes.func.isRequired,
  userId: PropTypes.string,
};
CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};
export default CardComponent;
