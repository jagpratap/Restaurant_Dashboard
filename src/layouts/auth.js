import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PublicHeader from "../components/layouts/public/header";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("authStatus"));
    if (localData) navigate("/dashboard/home");
  }, []);
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
};

export default Auth;
