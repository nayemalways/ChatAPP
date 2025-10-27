// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("accessToken"); // 🍪 cookie থেকে token পড়া

  if (!token) {
    // যদি token না থাকে, তাহলে login পেজে পাঠাও
    return <Navigate to="/login" replace />;
  }

  // token থাকলে children render করো
  return children;
};

export default ProtectedRoute;
