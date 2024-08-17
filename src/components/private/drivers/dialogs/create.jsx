import React, { useState } from "react";
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
} from "@mui/material";
import { useToast } from "../../feedback/toast";

export const CreateDialog = ({ open, onClose, refresh }) => {
  const { handleOpenToast } = useToast();
  const [newDriver, setNewDriver] = useState({
    movilCode: "",
    businessId: "66b5eed6f78f582c9f2530a1",
    personalInfo: {
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
      vehicleNumber: "",
      radioBrand: "",
    },
  });

  const handleChange = (section, field, value) => {
    setNewDriver((prev) => {
      if (section === "root") {
        return {
          ...prev,
          [field]: value,
        };
      } else if (field.includes(".")) {
        const [parentField, childField] = field.split(".");
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [parentField]: {
              ...prev[section][parentField],
              [childField]: value,
            },
          },
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
    });
  };

  const handleSubmit = async () => {
    console.log("New driver", newDriver);
    try {
      const response = await driversEndpoints.createDriver(newDriver);
      console.log("Response", response);
      if (response.codeError === "200") {
        handleOpenToast("Movil creado exitosamente", "success");
        onClose();
      } else {
        handleOpenToast("Error al crear el movil", "error");
      }
    } catch (error) {
      console.error("Error creando movil:", error);
      handleOpenToast("Error al crear el movil", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>CREAR NUEVO CONDUCTOR</b>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información Personal</Typography>
              <Divider />
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
                label="Número de ID"
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
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Nombre"
                value={newDriver.personalInfo.personalReference.name}
                onChange={(e) =>
                  handleChange(
                    "personalInfo",
                    "personalReference.name",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={newDriver.personalInfo.personalReference.phone}
                onChange={(e) =>
                  handleChange(
                    "personalInfo",
                    "personalReference.phone",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={newDriver.personalInfo.personalReference.cellPhone}
                onChange={(e) =>
                  handleChange(
                    "personalInfo",
                    "personalReference.cellPhone",
                    e.target.value
                  )
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
                label="Fecha de Ingreso"
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
                  handleChange(
                    "additionalInfo",
                    "guaranteeType",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de Vehículo"
                value={newDriver.additionalInfo.vehicleNumber}
                onChange={(e) =>
                  handleChange(
                    "additionalInfo",
                    "vehicleNumber",
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Marca del Radio"
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

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" color="primary">
            Código del Móvil
          </Typography>
          <Divider />
          <TextField
            label="Código del Móvil"
            value={newDriver.movilCode}
            onChange={(e) => handleChange("root", "movilCode", e.target.value)}
            fullWidth
            margin="normal"
            helperText="Este código es importante y se usará como usuario para el inicio de sesión del móvil. Puede configurarse más tarde si es necesario."
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};
