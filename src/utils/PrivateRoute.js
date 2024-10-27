import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you are using context for authentication

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
