import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from "../components/private/sidebar";
import HomePage from '../pages/home';
import ChatPage from '../pages/chat';
import DriverPage from '../pages/driver';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
        <SideBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/conductores" element={<DriverPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </SideBar>
    </BrowserRouter>
  );
};

export default PrivateRoutes;