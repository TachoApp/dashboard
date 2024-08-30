import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UpdateStopDialog } from './dialogs/update';
import { DeleteStopDialog } from './dialogs/delete';

export const DisplayStopsTable = ({ stops, setStops, refresh }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const handleEdit = (stop) => {
    setSelectedStop(stop);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleDelete = (stop) => {
    setSelectedStop(stop);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stops.map((stop) => (
              <TableRow key={stop._id}>
                <TableCell>{stop.name}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {stop.color ? (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: '1px solid white',
                          backgroundColor: stop.color,
                          marginRight: '8px',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: '1px solid white',
                          backgroundColor: 'transparent',
                          marginRight: '8px',
                        }}
                      />
                    )}
                    {stop.color}
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    <u>Ver en Google Maps</u>
                  </a>
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleEdit(stop)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(stop)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedStop && (
        <UpdateStopDialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          stop={selectedStop}
          refresh={refresh}
        />
      )}

      {selectedStop && (
        <DeleteStopDialog
          open={openDelete}
          onClose={handleCloseDelete}
          stop={selectedStop}
          refresh={refresh}
        />
      )}
    </>
  );
};
