import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoutePage from "../pages/AuthenticatedPage/PublicRoutePage";
import PrivateRoutePage from "../pages/AuthenticatedPage/PrivateRoutePage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import TodoPage from "../pages/Todo/TodoPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicRoutePage />}>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* Private */}
        <Route element={<PrivateRoutePage />}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
