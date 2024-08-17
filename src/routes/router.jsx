import React from "react";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import { ToastProvider } from "../components/private/feedback/toast"

const Router = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [logged, setLogged] = React.useState(true);

  return <ToastProvider>{logged ? <PrivateRoutes /> : <PublicRoutes />}</ToastProvider>;;
};

export default Router;