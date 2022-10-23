const Login = () => (
  <main className="login_page">
    <div className="page_card">
      <img className="card_illustration" src="/assets/images/svg/secure_login.svg" alt="secure_login" />
      <form className="card_form">
        <input
          type="text"
          id="username"
          name="username"
        />
        <input
          type="password"
          id="password"
          name="password"
        />
        <input
          type="submit"
          id="submit"
          name="submit"
        />
      </form>
    </div>
  </main>
);

export default Login;
