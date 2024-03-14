import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuth } from "../hooks/useAuth";
import AuthInitializer from "../components/auth/AuthInitializer";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route
            path="/auth"
            element={
              isAuthenticated ? <Navigate replace to="/" /> : <AuthPage />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuth,
  children,
}) => {
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

interface ProtectedRouteProps {
  isAuth: boolean;
  children: React.ReactNode;
}
