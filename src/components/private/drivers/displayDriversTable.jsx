import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Avatar,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { UpdateDialog } from './dialogs/update';
import { DeleteDialog } from './dialogs/delete';
import { ShowInfoDialog } from './dialogs/showInfo';

const API_IMAGES_URL = `${import.meta.env.VITE_BASE_URL}/`;

export const DisplayDriversTable = ({ drivers, setDrivers, refresh }) => {
  const [selectedDriver, setSelectedDriver] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const handleOpenEdit = (driver) => {
    setSelectedDriver(driver);
    setOpenEdit(true);
  };

  const handleOpenDelete = (driver) => {
    setSelectedDriver(driver);
    setOpenDelete(true);
  };

  const handleOpenInfo = (driver) => {
    setSelectedDriver(driver);
    setOpenInfo(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleCloseInfo = () => setOpenInfo(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Perfil</TableCell>
              <TableCell>Código Móvil</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.movilCode}>
                <TableCell>
                  <Avatar src={`${API_IMAGES_URL}${driver.personalInfo.profileImage}`} alt={driver.personalInfo.fullName} sx={{width: 50, height: 50}} />
                </TableCell>
                <TableCell>{driver.movilCode}</TableCell>
                <TableCell>{driver.personalInfo.fullName}</TableCell>
                <TableCell>{driver.vehicleInfo.licensePlateNumber}</TableCell>
                <TableCell>{`${driver.vehicleInfo.brand} ${driver.vehicleInfo.model} ${driver.vehicleInfo.color}`}</TableCell>
                <TableCell>
                  <Tooltip title="Ver información">
                    <IconButton onClick={() => handleOpenInfo(driver)}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleOpenEdit(driver)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleOpenDelete(driver)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedDriver && (
        <>
          <UpdateDialog 
            open={openEdit} 
            onClose={handleCloseEdit}
            driver={selectedDriver}
            refresh={refresh}
          />
          <DeleteDialog 
            open={openDelete} 
            onClose={handleCloseDelete}
            driver={selectedDriver}
            refresh={refresh}
          />
          <ShowInfoDialog 
            open={openInfo} 
            onClose={handleCloseInfo}
            driver={selectedDriver}
          />
        </>
      )}
    </>
  );
};
