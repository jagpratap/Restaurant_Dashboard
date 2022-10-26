import { Helmet } from "react-helmet";

import Component from "../../components/app/bookmarks";

const Bookmarks = () => (
  <div>
    <Helmet title="Bookmarks" />
    <Component />
  </div>
);

export default Bookmarks;
