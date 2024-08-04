import { useAuth } from '../contexts/Auth';
import { Outlet, Navigate, Link } from 'react-router-dom';

function PrivateRoute() {
    const { user } = useAuth();

    return user ? (
        <>
            <Outlet />
        </>
    )  : <Navigate to='/' />
    
}

export default PrivateRoute;