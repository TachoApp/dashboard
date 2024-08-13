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
  Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { UpdateDialog } from './dialogs/update';
import { DeleteDialog } from './dialogs/delete';
import { ShowInfoDialog } from './dialogs/showInfo';

export const DisplayDriversTable = ({ drivers, setDrivers }) => {
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

  const handleUpdateDriver = (updatedDriver) => {
    setDrivers(drivers.map(driver => 
      driver.movilCode === updatedDriver.movilCode ? updatedDriver : driver
    ));
    console.log("Conductor actualizado:", updatedDriver);
    handleCloseEdit();
  };

  const handleDeleteDriver = (movilCode) => {
    setDrivers(drivers.filter(driver => driver.movilCode !== movilCode));
    console.log("Conductor eliminado:", movilCode);
    handleCloseDelete();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Movil Code</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.movilCode}>
                <TableCell>
                  <Avatar src={driver.personalInfo.profileImage} alt={driver.personalInfo.fullName} />
                </TableCell>
                <TableCell>{driver.movilCode}</TableCell>
                <TableCell>{driver.personalInfo.fullName}</TableCell>
                <TableCell>{driver.vehicleInfo.licensePlateNumber}</TableCell>
                <TableCell>{`${driver.vehicleInfo.brand} ${driver.vehicleInfo.model}`}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenInfo(driver)}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenEdit(driver)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDelete(driver)}>
                    <DeleteIcon />
                  </IconButton>
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
            onUpdate={handleUpdateDriver}
          />
          <DeleteDialog 
            open={openDelete} 
            onClose={handleCloseDelete}
            driver={selectedDriver}
            onDelete={() => handleDeleteDriver(selectedDriver.movilCode)}
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
