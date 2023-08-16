import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutePage = () => {
  const authenticated = localStorage.getItem("token");

  return !authenticated ? (
    <Navigate to="/signin" {...alert("로그인이 필요한 서비스입니다.")} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutePage;
