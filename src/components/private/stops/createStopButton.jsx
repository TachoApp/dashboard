import { useState } from "react";
import { Button } from "@mui/material";
import { CreateStopDialog } from "./dialogs/create";

export const CreateStopButton = ({ refresh }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <b>Crear Parada</b>
      </Button>
      <CreateStopDialog open={open} onClose={handleClose} refresh={refresh} />
    </>
  );
};
