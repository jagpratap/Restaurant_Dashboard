import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/layout";

import Home from "./pages/home";
import Login from "./pages/auth/login";
import PageNotFound from "./pages/auth/pageNotFound";

const routes = [
  {
    key: "HOME",
    path: "/home",
    exact: true,
    component: Home,
  },
  // AUTH ROUTES
  {
    key: "LOGIN",
    path: "/auth/login",
    exact: true,
    component: Login,
  },
  {
    key: "PAGE_NOT_FOUND",
    path: "/auth/pageNotFound",
    exact: true,
    component: PageNotFound,
  },
];

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        {routes.map(({
          component: Component,
          ...props
        }) => (
          <Route {...props} element={<Component />} />
        ))}
        <Route path="/" exact element={<Navigate to="/auth/login" />} />
        <Route path="*" exact element={<Navigate to="/auth/pageNotFound" />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
