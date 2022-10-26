import { Helmet } from "react-helmet";

import Component from "../../components/app/home";

const Home = () => (
  <div>
    <Helmet title="Home" />
    <Component />
  </div>
);

export default Home;
