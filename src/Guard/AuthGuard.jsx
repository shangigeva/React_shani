import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AuthGuard = ({ children }) => {
  const loggedIn = useSelector((bigPie) => bigPie.auth.loggedIn);
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};
export default AuthGuard;
