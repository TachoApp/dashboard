import React, { createContext, useContext, useState } from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe ser utilizado dentro de un ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const handleOpenToast = (message, severity) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <ToastContext.Provider value={{ handleOpenToast, handleCloseToast }}>
      {children}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert variant="filled" onClose={handleCloseToast} severity={toastSeverity} sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};