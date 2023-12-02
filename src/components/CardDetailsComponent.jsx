import React from "react";
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
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
const CardDetailsComponent = ({
  _id,
  title,
  subTitle,
  phone,
  address,
  img,
  name,
  alt,
  createdAt,
  description,
  like,
  email,
  countLikes,
  onEditCard,
  userId,
}) => {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        height: "100%",
        margin: "1rem",
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardActionArea onClick={() => navigate(`${ROUTES.DETAILS}/${_id}`)}>
          <CardMedia height={"220px"} component="img" image={img} alt={alt} />
        </CardActionArea>
        <CardContent>
          <CardHeader title={title} subheader={subTitle} sx={{ p: 0, mb: 1 }} />
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
            </Typography>{" "}
            <Typography variant="body2">
              <Typography fontWeight="700" variant="subtitle1" component="span">
                Email:{" "}
              </Typography>
              {email}{" "}
            </Typography>{" "}
            <Typography variant="body2">
              <Typography fontWeight="700" variant="subtitle1" component="span">
                Description:{" "}
              </Typography>
              {description}{" "}
            </Typography>{" "}
            <Typography variant="body2">
              <Typography fontWeight="700" variant="subtitle1" component="span">
                Create time:{" "}
              </Typography>
              {createdAt}{" "}
            </Typography>
          </Box>{" "}
          <Box
            sx={{ marginTop: "1rem" }}
            display="flex"
            justifyContent="center"
            onClick={() => navigate(ROUTES.HOME)}
          >
            <Button variant="outlined" color="primary">
              BACK{" "}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
CardDetailsComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  createdAt: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  cardNumber: PropTypes.number,
  userId: PropTypes.string,
};
CardDetailsComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};
export default CardDetailsComponent;
