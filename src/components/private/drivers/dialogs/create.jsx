import React, { useState, useEffect } from "react";
import driversEndpoints from "../../../../services/drivers";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useToast } from "../../feedback/toast";

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const isFormValid = (form) => {
  // Implement your form validation logic here
  return true;
};

export const CreateDialog = ({ open, onClose, refresh }) => {
  const { handleOpenToast } = useToast();
  const [newDriver, setNewDriver] = useState({
    movilCode: "",
    personalInfo: {
      profileImage: "",
      fullName: "",
      idNumber: "",
      dateOfBirth: "",
      homeAddress: "",
      phone: "",
      cellPhone: "",
      personalReference: {
        name: "",
        phone: "",
        cellPhone: "",
      },
    },
    vehicleInfo: {
      brand: "",
      model: "",
      color: "",
      licensePlateNumber: "",
      type: "",
    },
    additionalInfo: {
      entryDate: "",
      guaranteeType: "",
      radioBrand: "",
    },
    profileImageFile: null,
  });

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setNewDriver({
        movilCode: "",
        personalInfo: {
          profileImage: "",
          fullName: "",
          idNumber: "",
          dateOfBirth: "",
          homeAddress: "",
          phone: "",
          cellPhone: "",
          personalReference: {
            name: "",
            phone: "",
            cellPhone: "",
          },
        },
        vehicleInfo: {
          brand: "",
          model: "",
          color: "",
          licensePlateNumber: "",
          type: "",
        },
        additionalInfo: {
          entryDate: "",
          guaranteeType: "",
          radioBrand: "",
        },
        profileImageFile: null,
      });
    }
  }, [open]);

  const handleChange = (section, field, value) => {
    setNewDriver((prev) => {
      let newValue = value;
      if (field === "movilCode") {
        newValue = value.toUpperCase();
      }
      if (field === "licensePlateNumber") {
        newValue = value.toUpperCase();
      }
      if (["fullName", "name", "brand", "model", "color"].includes(field)) {
        newValue = capitalizeWords(value);
      }
      if (section === "root") {
        return {
          ...prev,
          [field]: newValue,
        };
      } else if (section.includes(".")) {
        const [parentSection, parentField] = section.split(".");
        return {
          ...prev,
          [parentSection]: {
            ...prev[parentSection],
            [parentField]: {
              ...prev[parentSection][parentField],
              [field]: newValue,
            },
          },
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: newValue,
          },
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDriver((prev) => ({
        ...prev,
        profileImageFile: file,
        personalInfo: {
          ...prev.personalInfo,
          profileImage: URL.createObjectURL(file),
        }
      }));
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid(newDriver)) {
      handleOpenToast("Por favor, complete todos los campos requeridos correctamente.", "warning");
      return;
    }
  
    const formData = new FormData();
    formData.append("movilCode", newDriver.movilCode);
    formData.append("personalInfo", JSON.stringify(newDriver.personalInfo));
    formData.append("vehicleInfo", JSON.stringify(newDriver.vehicleInfo));
    formData.append("additionalInfo", JSON.stringify(newDriver.additionalInfo));
  
    if (newDriver.profileImageFile) {
      formData.append("image", newDriver.profileImageFile);
    }
  
    try {
      await driversEndpoints.createDriver(formData);
      handleOpenToast("Conductor creado exitosamente", "success");
      onClose();
      refresh();
    } catch (error) {
      console.error("Error creando conductor:", error);
      handleOpenToast("Error al crear el conductor, verifica que el código del móvil no sea repetido", "error");
    }
  };

  const handleClose = () => {
    setNewDriver({
      movilCode: "",
      personalInfo: {
        profileImage: "",
        fullName: "",
        idNumber: "",
        dateOfBirth: "",
        homeAddress: "",
        phone: "",
        cellPhone: "",
        personalReference: {
          name: "",
          phone: "",
          cellPhone: "",
        },
      },
      vehicleInfo: {
        brand: "",
        model: "",
        color: "",
        licensePlateNumber: "",
        type: "",
      },
      additionalInfo: {
        entryDate: "",
        guaranteeType: "",
        radioBrand: "",
      },
      profileImageFile: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>CREAR NUEVO CONDUCTOR</b>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Código Móvil"
          value={newDriver.movilCode}
          onChange={(e) =>
            handleChange("root", "movilCode", e.target.value)
          }
          fullWidth
          helperText="Este código es importante y se usará como usuario para el inicio de sesión del móvil."
          sx={{mb: 2, mt: 1}}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información Personal</Typography>
              <Divider />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 1 }}>
                <Avatar
                  src={newDriver.personalInfo.profileImage}
                  alt="Imagen de Perfil"
                  sx={{ width: 100, height: 100, borderRadius: '50%' }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  128px x 128px
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    sx={{
                      '@media (max-width:600px)': {
                        mt: 1,
                      },
                    }}
                  >
                    <PhotoCamera fontSize="small" sx={{mr: 1}}/>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    Subir Imagen
                  </Button>
                </Box>
              </Box>

              <TextField
                label="Nombre Completo"
                value={newDriver.personalInfo.fullName}
                onChange={(e) =>
                  handleChange("personalInfo", "fullName", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de carnet de identidad"
                value={newDriver.personalInfo.idNumber}
                onChange={(e) =>
                  handleChange("personalInfo", "idNumber", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                value={newDriver.personalInfo.dateOfBirth}
                onChange={(e) =>
                  handleChange("personalInfo", "dateOfBirth", e.target.value)
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Dirección"
                value={newDriver.personalInfo.homeAddress}
                onChange={(e) =>
                  handleChange("personalInfo", "homeAddress", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={newDriver.personalInfo.phone}
                onChange={(e) =>
                  handleChange("personalInfo", "phone", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={newDriver.personalInfo.cellPhone}
                onChange={(e) =>
                  handleChange("personalInfo", "cellPhone", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Referencia Personal
              </Typography>
              <TextField
                label="Nombre"
                value={newDriver.personalInfo.personalReference.name}
                onChange={(e) =>
                  handleChange("personalInfo.personalReference", "name", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={newDriver.personalInfo.personalReference.phone}
                onChange={(e) =>
                  handleChange("personalInfo.personalReference", "phone", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={newDriver.personalInfo.personalReference.cellPhone}
                onChange={(e) =>
                  handleChange("personalInfo.personalReference", "cellPhone", e.target.value)
                }
                fullWidth
                margin="normal"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información del Vehículo</Typography>
              <Divider />
              <TextField
                label="Marca"
                value={newDriver.vehicleInfo.brand}
                onChange={(e) =>
                  handleChange("vehicleInfo", "brand", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Modelo"
                value={newDriver.vehicleInfo.model}
                onChange={(e) =>
                  handleChange("vehicleInfo", "model", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Color"
                value={newDriver.vehicleInfo.color}
                onChange={(e) =>
                  handleChange("vehicleInfo", "color", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de Placa"
                value={newDriver.vehicleInfo.licensePlateNumber}
                onChange={(e) =>
                  handleChange("vehicleInfo", "licensePlateNumber", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tipo"
                value={newDriver.vehicleInfo.type}
                onChange={(e) =>
                  handleChange("vehicleInfo", "type", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Información Adicional
              </Typography>
              <Divider />
              <TextField
                label="Fecha de Entrada"
                type="date"
                value={newDriver.additionalInfo.entryDate}
                onChange={(e) =>
                  handleChange("additionalInfo", "entryDate", e.target.value)
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Tipo de Garantía"
                value={newDriver.additionalInfo.guaranteeType}
                onChange={(e) =>
                  handleChange("additionalInfo", "guaranteeType", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Marca de Radio"
                value={newDriver.additionalInfo.radioBrand}
                onChange={(e) =>
                  handleChange("additionalInfo", "radioBrand", e.target.value)
                }
                fullWidth
                margin="normal"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{mx: 2, mb: 1}}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!isFormValid(newDriver)}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};
