import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { AuthScreen } from "../layout";

export const AuthenticationRoutes = () => {
  const { isSignedUp } = useAuthStore();

  return (
    <Routes>
      <Route path="/sign-up" element={<AuthScreen />} />
      <Route path="/sign-in" element={<AuthScreen />} />

      <Route
        path="*"
        element={<Navigate to={isSignedUp ? "/sign-in" : "/sign-up"} replace />}
      />
    </Routes>
  );
};
