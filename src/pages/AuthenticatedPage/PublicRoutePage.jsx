import { Navigate, Outlet } from "react-router-dom";

const PublicRoutePage = () => {
  const authenticated = localStorage.getItem("token");

  return authenticated ? <Navigate to="/todo" /> : <Outlet />;
};

export default PublicRoutePage;
