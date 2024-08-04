import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login'

const PublicRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/ingreso" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/ingreso" replace />} />
        </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;