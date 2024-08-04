import React from "react";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

const Router = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [logged, setLogged] = React.useState(true);

  return <>{logged ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default Router;