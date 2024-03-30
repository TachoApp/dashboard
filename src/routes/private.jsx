import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SideBar } from "../components/private/sidebar";
import HomePage from '../pages/home';
import ChatPage from '../pages/chat';
import DriverPage from '../pages/driver';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/drivers" element={<DriverPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
