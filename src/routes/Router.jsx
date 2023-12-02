import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import Error404Page from "../pages/404/Error404Page";
import LoginPage from "../pages/login/LoginPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import AuthGuard from "../Guard/AuthGuard";
import BizGuard from "../Guard/BizGuard";
import CreateCardPage from "../pages/createCardPage/CreateCardPage";
import FavoriteCardPage from "../pages/FavoriteCardsPage/FavoriteCardPage";
import ProfilePage from "../pages/profile/ProfilePage";
import AboutPage from "../pages/about/AboutPage";
import MyCards from "../pages/myCards/MyCards";
import UserListPage from "../pages/userList/UserListPage";
import CardDetailsPage from "../pages/CardDetailsPage/CardDetailsPage";
import EditProfilePage from "../pages/profile/EditProfilePage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.FAVCARD} element={<FavoriteCardPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.EDITPROFILE} element={<EditProfilePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CARDS} element={<MyCards />} />
      <Route path={ROUTES.LIST} element={<UserListPage />} />
      <Route path={`${ROUTES.DETAILS}/:cardId`} element={<CardDetailsPage />} />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <AuthGuard>
            <BizGuard>
              <CreateCardPage />
            </BizGuard>
          </AuthGuard>
        }
      />
      <Route path={`${ROUTES.EDITCARD}/:cardId`} element={<EditCardPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
