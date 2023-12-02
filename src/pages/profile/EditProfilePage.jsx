import React, { useState, useEffect } from "react";
import UserEditComponent from "../../components/UserEditComponent";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditProfilePage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const { userId } = useParams();
  if (userId === "myProfile") {
    return <UserEditComponent userId={userData._id} />;
  }

  return <UserEditComponent userId={userId} />;
};

export default EditProfilePage;
