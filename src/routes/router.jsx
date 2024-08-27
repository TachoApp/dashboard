import React from "react";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import { ToastProvider } from "../components/private/feedback/toast"

const Router = () => {
  const isLoggedIn = localStorage.getItem('isLoggedInTachoBusiness');
  const [logged, setLogged] = React.useState(isLoggedIn || false);

  return <ToastProvider>{logged ? <PrivateRoutes /> : <PublicRoutes />}</ToastProvider>;;
};

export default Router;