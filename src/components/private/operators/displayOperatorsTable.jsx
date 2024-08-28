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
import { UpdateOperatorDialog } from './dialogs/update';
import { DeleteOperatorDialog } from './dialogs/delete';

export const DisplayOperatorsTable = ({ operators, setOperators, refresh }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handleEdit = (operator) => {
    setSelectedOperator(operator);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleDelete = (operator) => {
    setSelectedOperator(operator);
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
              <TableCell>Contacto</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Contraseña</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operators.map((operator) => (
              <TableRow key={operator._id}>
                <TableCell>{operator.name}</TableCell>
                <TableCell>{operator.contact || '-'}</TableCell>
                <TableCell>{operator.user}</TableCell>
                <TableCell>{operator.password}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleEdit(operator)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(operator)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogo de Editar Operadora */}
      {selectedOperator && (
        <UpdateOperatorDialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          operatorData={selectedOperator}
          refresh={refresh}
        />
      )}

      {/* Dialogo de Eliminar Operadora */}
      {selectedOperator && (
        <DeleteOperatorDialog
          open={openDelete}
          onClose={handleCloseDelete}
          operator={selectedOperator}
          refresh={refresh}
        />
      )}
    </>
  );
};
