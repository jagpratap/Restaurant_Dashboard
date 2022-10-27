import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProtectedHeader from "../../components/layouts/protected/header";
import Sidebar from "../../components/layouts/protected/sidebar";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("authStatus"));
    if (!localData) navigate("/auth/login");
  }, []);
  return (
    <div className="protected-layout">
      <ProtectedHeader />
      <main className="dashboard-page">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default Protected;
