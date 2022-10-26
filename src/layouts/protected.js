import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Dashboard from "../components/layouts/protected";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("authStatus"));
    if (!localData) navigate("/auth/login");
  }, []);
  return (
    <div>
      <Dashboard />
      {children}
    </div>
  );
};

export default Protected;
