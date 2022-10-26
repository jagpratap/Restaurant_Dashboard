import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../context/userContext";

const ProtectedHeader = () => {
  const navigate = useNavigate();
  const { setAuthentication } = useUserContext();
  const onClickLogout = () => {
    setAuthentication(false);
    localStorage.setItem("authStatus", JSON.stringify(false));
    navigate("/auth/login");
  };
  return (
    <header className="protected-header">
      <div className="container">
        <nav className="navbar">
          <div className="nav_left">
            <h1 className="brand">Brand</h1>
          </div>
          <div className="nav_right">
            <p className="logout_text">Logout</p>
            <img
              className="logout_icon"
              src="/assets/images/svg/logout.svg"
              alt="logout_icon"
              onClick={onClickLogout}
              onKeyDown={onClickLogout}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ProtectedHeader;
