import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from "../components/private/sidebar";
import HomePage from '../pages/home';
import ChatPage from '../pages/chat';
import DriverPage from '../pages/driver';
import OperatorsPage from '../pages/operators';
import StopsPage from '../pages/stops';

const PrivateRoutes = () => {
  const userType = localStorage.getItem('userRolTachoBusiness'); // Obtenemos el tipo de usuario del almacenamiento local

  // Componente de Ruta Protegida
  const ProtectedRoute = ({ element, allowedRoles }) => {
    // Si no hay usuario o el usuario no tiene uno de los roles permitidos, redirige a la página de login
    if (!userType || !allowedRoles.includes(userType)) {
      return <Navigate to="/" replace />;
    }
    return element; // Renderiza el componente permitido
  };

  return (
    <BrowserRouter>
      <SideBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/conductores" element={<ProtectedRoute element={<DriverPage />} allowedRoles={['adm', 'operator']} />} />
          <Route path="/operadores" element={<ProtectedRoute element={<OperatorsPage />} allowedRoles={['adm']} />} />
          <Route path="/paradas" element={<ProtectedRoute element={<StopsPage />} allowedRoles={['adm', 'operator']} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
