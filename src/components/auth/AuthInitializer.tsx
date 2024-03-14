import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../store/authSlice";
import { STORAGE_TYPES } from "../../utils/Constants";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TYPES.ACCESS_TOKEN);
    const isAuthenticated = !!token;
    dispatch(setIsAuthenticated(isAuthenticated));
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;
