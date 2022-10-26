import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProtectedHeader from "../components/layouts/protectedHeader";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("authStatus"));
    if (!localData) navigate("/auth/login");
  }, []);
  return (
    <div>
      <ProtectedHeader />
      {children}
    </div>
  );
};

export default Protected;
