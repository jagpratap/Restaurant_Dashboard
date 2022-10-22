import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

// LAYOUT WRAPPER
import ProtectedLayout from "./protected";
import AuthLayout from "./auth";

const Layouts = {
  protected: ProtectedLayout,
  auth: AuthLayout,
};

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  // RETURN LAYOUT BASED ON THE URL
  const getLayout = () => {
    if (/^\/auth(?=\/|$)/i.test(pathname)) return "auth";
    return "protected";
  };

  const Wrapper = Layouts[getLayout()];

  return (
    <>
      <Helmet titleTemplate="Dashboard | %s" />
      <Wrapper pathname={pathname}>
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;
