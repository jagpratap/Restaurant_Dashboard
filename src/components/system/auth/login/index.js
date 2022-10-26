/* eslint-disable no-console */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../context/userContext";

const apiAuthKey = process.env.REACT_APP_API_AUTHORIZATION_KEY;

const getResponse = async () => {
  const response = await fetch("https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view", {
    headers: {
      Authorization: `Bearer ${apiAuthKey}`,
    },
  });
  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { records } = await response.json();
  return records;
};

const Login = () => {
  const userNameRef = useRef();
  const navigate = useNavigate();
  const { setAuthentication } = useUserContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [areCredentialsMatches, setCredentialsMatches] = useState(true);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    // Set initial Focus to username field
    userNameRef.current.focus();
  }, []);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    getResponse()
      .then((records) => {
        for (let i = 0; i < records.length; i += 1) {
          const { username, password } = records[i].fields;
          if (username === formData.username
            && password === formData.password) {
            setAuthentication(true);
            setCredentialsMatches(true);
            localStorage.setItem("authStatus", JSON.stringify(true));
            setFormData({
              username: "",
              password: "",
            });
            setLoading(false);
            navigate("/dashboard/home");
            break;
          } else {
            setAuthentication(false);
            setCredentialsMatches(false);
            localStorage.setItem("authStatus", JSON.stringify(false));
            setFormData({
              username: "",
              password: "",
            });
            setLoading(false);
            userNameRef.current.focus();
          }
        }
      })
      .catch((error) => {
        console.log("rejected =>", error);
      });
  };
  return (
    <main className="login_page">
      <div className="page_card">
        <img className="card_illustration" src="/assets/images/svg/secure_login.svg" alt="secure_login" />
        <form className="card_form" onSubmit={onSubmitHandler}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={formData.username}
            onChange={onChangeHandler}
            ref={userNameRef}
            required
          />
          <div className="password_field">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChangeHandler}
              required
            />
            <img
              src={`/assets/images/svg/visibility_${isPasswordVisible ? "on" : "off"}.svg`}
              alt="visibility_icon"
              onClick={() => setPasswordVisible((prev) => !prev)}
              onKeyDown={() => setPasswordVisible((prev) => !prev)}
            />
          </div>
          <div className="submit_field">
            <input
              type="submit"
              id="submit"
              name="submit"
              value="Login"
            />
            {isLoading && <div className="lds-dual-ring" />}
          </div>
          {!areCredentialsMatches && <small>Username or Password didn&apos;t matches !!!</small>}
        </form>
      </div>
    </main>
  );
};

export default Login;
