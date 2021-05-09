import { Fragment } from "react";

import MainNavigation from "./main-nav";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <div className="container mt-3">{props.children}</div>
    </Fragment>
  );
};

export default Layout;
