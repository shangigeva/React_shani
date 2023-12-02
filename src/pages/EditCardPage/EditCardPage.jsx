import React from "react";
import CardEditComponent from "../../components/CardEditComponent";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditCardPage = () => {
  const { cardId } = useParams();
  return <CardEditComponent _id={cardId} />;
};

export default EditCardPage;
