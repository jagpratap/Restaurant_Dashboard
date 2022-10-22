import PublicHeader from "../components/layouts/publicHeader";

const Auth = ({ children }) => (
  <div>
    <PublicHeader />
    {children}
  </div>
);

export default Auth;
