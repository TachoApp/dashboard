import React, { useState, useEffect } from "react";
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
import driversEndpoints from "../../../../services/drivers";
import { useToast } from "../../feedback/toast";
import { useLogout } from '../../../../helpers/logout';

const API_IMAGES_URL = `${import.meta.env.VITE_BASE_URL}/`;

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const isFormValid = (form) => {
  return true; // Ajusta la lógica de validación según sea necesario
};

export const UpdateDialog = ({ open, onClose, driver, refresh }) => {
  const { handleOpenToast } = useToast();
  const [updatedDriver, setUpdatedDriver] = useState({
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
  });

  useEffect(() => {
    if (driver) {
      setUpdatedDriver({
        movilCode: driver.movilCode || "",
        personalInfo: {
          profileImage: driver.personalInfo.profileImage || "",
          fullName: capitalizeWords(driver.personalInfo.fullName || ""),
          idNumber: driver.personalInfo.idNumber || "",
          dateOfBirth: driver.personalInfo.dateOfBirth
            ? driver.personalInfo.dateOfBirth.substring(0, 10)
            : "",
          homeAddress: driver.personalInfo.homeAddress || "",
          phone: driver.personalInfo.phone || "",
          cellPhone: driver.personalInfo.cellPhone || "",
          personalReference: {
            name: driver.personalInfo.personalReference.name || "",
            phone: driver.personalInfo.personalReference.phone || "",
            cellPhone: driver.personalInfo.personalReference.cellPhone || "",
          },
        },
        vehicleInfo: {
          brand: driver.vehicleInfo.brand || "",
          model: driver.vehicleInfo.model || "",
          color: driver.vehicleInfo.color || "",
          licensePlateNumber: driver.vehicleInfo.licensePlateNumber || "",
          type: driver.vehicleInfo.type || "",
        },
        additionalInfo: {
          entryDate: driver.additionalInfo.entryDate
            ? driver.additionalInfo.entryDate.substring(0, 10)
            : "",
          guaranteeType: driver.additionalInfo.guaranteeType || "",
          radioBrand: driver.additionalInfo.radioBrand || "",
        },
      });
    }
  }, [driver]);

  const handleChange = (section, field, value) => {
    setUpdatedDriver((prev) => {
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
      setUpdatedDriver((prev) => ({
        ...prev,
        profileImageFile: file,
        personalInfo: {
          ...prev.personalInfo,
          profileImage: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid(updatedDriver)) {
      handleOpenToast(
        "Por favor, complete todos los campos requeridos correctamente.",
        "warning"
      );
      return;
    }

    console.log(updatedDriver)

    const formData = new FormData();
    formData.append("movilCode", updatedDriver.movilCode);
    formData.append("personalInfo", JSON.stringify(updatedDriver.personalInfo));
    formData.append("vehicleInfo", JSON.stringify(updatedDriver.vehicleInfo));
    formData.append(
      "additionalInfo",
      JSON.stringify(updatedDriver.additionalInfo)
    );

    if (updatedDriver.profileImageFile) {
      formData.append("image", updatedDriver.profileImageFile);
    }

    try {
      const response = await driversEndpoints.updateDriver(
        driver._id,
        formData
      );
      handleOpenToast("Conductor actualizado exitosamente", "success");
      onClose();
      refresh();
    } catch (error) {
      if (error.response.status === 498) {
        useLogout();
      }
      console.error("Error actualizando conductor:", error);
      handleOpenToast("Error al actualizar el conductor, verifica que el codigo del movil no sea repetido", "error");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>ACTUALIZAR CONDUCTOR</DialogTitle>
      <DialogContent>
        <TextField
          label="Código Móvil"
          value={updatedDriver.movilCode}
          onChange={(e) => handleChange("root", "movilCode", e.target.value)}
          fullWidth
          helperText="Este código es importante y se usará como usuario para el inicio de sesión del móvil."
          sx={{ mb: 2, mt: 1 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información Personal</Typography>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                  mb: 1,
                }}
              >
                <Avatar
                  src={
                    updatedDriver.profileImageFile
                      ? updatedDriver.personalInfo.profileImage
                      : `${API_IMAGES_URL}${updatedDriver.personalInfo.profileImage}`
                  }
                  alt="Imagen de Perfil"
                  sx={{ width: 100, height: 100, borderRadius: "50%" }}
                />

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  128px x 128px
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    sx={{
                      "@media (max-width:600px)": {
                        mt: 1,
                      },
                    }}
                  >
                    <PhotoCamera fontSize="small" sx={{ mr: 1 }} />
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
                value={updatedDriver.personalInfo.fullName}
                onChange={(e) =>
                  handleChange("personalInfo", "fullName", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de carnet de identidad"
                value={updatedDriver.personalInfo.idNumber}
                onChange={(e) =>
                  handleChange("personalInfo", "idNumber", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                value={updatedDriver.personalInfo.dateOfBirth}
                onChange={(e) =>
                  handleChange("personalInfo", "dateOfBirth", e.target.value)
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Dirección"
                value={updatedDriver.personalInfo.homeAddress}
                onChange={(e) =>
                  handleChange("personalInfo", "homeAddress", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={updatedDriver.personalInfo.phone}
                onChange={(e) =>
                  handleChange("personalInfo", "phone", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={updatedDriver.personalInfo.cellPhone}
                onChange={(e) =>
                  handleChange("personalInfo", "cellPhone", e.target.value)
                }
                fullWidth
                margin="normal"
              />

              <Typography variant="h6" sx={{ mt: 2 }}>
                Referencia Personal
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TextField
                label="Nombre de Referencia"
                value={updatedDriver.personalInfo.personalReference.name}
                onChange={(e) =>
                  handleChange(
                    "personalInfo.personalReference",
                    "name",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={updatedDriver.personalInfo.personalReference.phone}
                onChange={(e) =>
                  handleChange(
                    "personalInfo.personalReference",
                    "phone",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={updatedDriver.personalInfo.personalReference.cellPhone}
                onChange={(e) =>
                  handleChange(
                    "personalInfo.personalReference",
                    "cellPhone",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Información del Vehículo</Typography>
            <Divider />
            <TextField
              label="Marca"
              value={updatedDriver.vehicleInfo.brand}
              onChange={(e) =>
                handleChange("vehicleInfo", "brand", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Modelo"
              value={updatedDriver.vehicleInfo.model}
              onChange={(e) =>
                handleChange("vehicleInfo", "model", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Color"
              value={updatedDriver.vehicleInfo.color}
              onChange={(e) =>
                handleChange("vehicleInfo", "color", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Placa"
              value={updatedDriver.vehicleInfo.licensePlateNumber}
              onChange={(e) =>
                handleChange(
                  "vehicleInfo",
                  "licensePlateNumber",
                  e.target.value
                )
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tipo"
              value={updatedDriver.vehicleInfo.type}
              onChange={(e) =>
                handleChange("vehicleInfo", "type", e.target.value)
              }
              fullWidth
              margin="normal"
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Información Adicional
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              label="Fecha de Ingreso"
              type="date"
              value={updatedDriver.additionalInfo.entryDate}
              onChange={(e) =>
                handleChange("additionalInfo", "entryDate", e.target.value)
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Tipo de Garantía"
              value={updatedDriver.additionalInfo.guaranteeType}
              onChange={(e) =>
                handleChange("additionalInfo", "guaranteeType", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Marca de Radio"
              value={updatedDriver.additionalInfo.radioBrand}
              onChange={(e) =>
                handleChange("additionalInfo", "radioBrand", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
