import { useNavigate } from "react-router-dom";

const ProtectedHeader = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    localStorage.setItem("authStatus", JSON.stringify(false));
    navigate("/auth/login");
  };
  return (
    <header className="header">
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
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ProtectedHeader;
