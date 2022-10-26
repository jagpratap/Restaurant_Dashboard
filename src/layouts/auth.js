import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PublicHeader from "../components/layouts/publicHeader";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("authStatus"));
    if (localData) navigate("/home");
  }, []);
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
};

export default Auth;
