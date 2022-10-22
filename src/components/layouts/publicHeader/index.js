const PublicHeader = () => (
  <header className="header">
    <div className="container">
      <nav className="navbar">
        <div className="nav_left">
          <h1 className="brand">Brand</h1>
        </div>
        <div className="nav_right">
          <p className="login_text">Login</p>
          <img className="login_icon" src="/assets/images/svg/login.svg" alt="login_icon" />
        </div>
      </nav>
    </div>
  </header>
);

export default PublicHeader;
