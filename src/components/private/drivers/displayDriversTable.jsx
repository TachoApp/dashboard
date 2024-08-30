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
  Tooltip,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { UpdateDialog } from './dialogs/update';
import { DeleteDialog } from './dialogs/delete';
import { ShowInfoDialog } from './dialogs/showInfo';
import { ActivateDriverDialog } from './dialogs/activateDriver';
import { DeactivateDriverDialog } from './dialogs/deactivateDriver';
const API_IMAGES_URL = `${import.meta.env.VITE_BASE_URL}/`;

export const DisplayDriversTable = ({ drivers, setDrivers, refresh }) => {
  const [selectedDriver, setSelectedDriver] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openActivate, setOpenActivate] = React.useState(false);
  const [openDeactivate, setOpenDeactivate] = React.useState(false);

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

  const handleOpenActivate = (driver) => {
    setSelectedDriver(driver);
    setOpenActivate(true);
  };

  const handleOpenDeactivate = (driver) => {
    setSelectedDriver(driver);
    setOpenDeactivate(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleCloseInfo = () => setOpenInfo(false);
  const handleCloseActivate = () => setOpenActivate(false);
  const handleCloseDeactivate = () => setOpenDeactivate(false);

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
              <TableCell>Activo</TableCell>
              <TableCell>Trabajando</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.movilCode}>
                <TableCell>
                  <Avatar src={`${API_IMAGES_URL}${driver.personalInfo.profileImage}`} alt={driver.personalInfo.fullName} sx={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{driver.movilCode}</TableCell>
                <TableCell>{driver.personalInfo.fullName}</TableCell>
                <TableCell>{driver.vehicleInfo.licensePlateNumber}</TableCell>
                <TableCell>{`${driver.vehicleInfo.brand} ${driver.vehicleInfo.model} ${driver.vehicleInfo.color}`}</TableCell>
                <TableCell>
                  <Chip 
                    label={driver.isActive ? "Activo" : "Inactivo"} 
                    color={driver.isActive ? "success" : "default"} 
                    sx={{ fontSize: '13px', fontWeight: 'bold', p: .5 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={driver.isWorking ? "Trabajando" : "No Trabajando"} 
                    color={driver.isWorking ? "primary" : "default"}
                    sx={{ fontSize: '13px', fontWeight: 'bold', p: .5 }}
                  />
                </TableCell>
                <TableCell>
                <Tooltip title={driver.isActive ? "Desactivar" : "Activar"}>
                <IconButton onClick={() => driver.isActive ? handleOpenDeactivate(driver) : handleOpenActivate(driver)}>
                      <PowerSettingsNewIcon color={driver.isActive ? "error" : "success"} />
                    </IconButton>
                  </Tooltip>
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
          <ActivateDriverDialog 
            open={openActivate} 
            onClose={handleCloseActivate}
            driver={selectedDriver}
            refresh={refresh}
          />
          <DeactivateDriverDialog 
            open={openDeactivate} 
            onClose={handleCloseDeactivate}
            driver={selectedDriver}
            refresh={refresh}
          />
        </>
      )}
    </>
  );
};
