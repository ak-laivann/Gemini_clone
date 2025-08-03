import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { AuthenticationRoutes } from "./Authentication.routes";
import { AppRoutes } from "./App.routes";

export const RootRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="*" element={<AppRoutes />} />
      ) : (
        <Route path="*" element={<AuthenticationRoutes />} />
      )}
    </Routes>
  );
};
