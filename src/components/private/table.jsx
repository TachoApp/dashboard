import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

export const TableComponent = ({ headers, data }) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{ textAlign: 'center' }}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ textAlign: 'center' }}>
                {item.avatar ? (
                  <Avatar alt="Avatar" src={item.avatar} sx={{ margin: 'auto' }} />
                ) : (
                  "Sin imagen"
                )}
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.code}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.name}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.ciNumber}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.plate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
