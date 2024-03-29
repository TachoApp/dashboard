import React from "react";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

const Router = () => {
  const [logged, setLogged] = React.useState(true);

  return <>{logged ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default Router;