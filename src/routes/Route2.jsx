import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Users/Users';
import Places from '../pages/Places/Places';
import AddPlaces from '../pages/Places/AddPlaces';
import EditPlace from '../pages/Places/EditPlace';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/users" element={<Users />} />
            <Route path="/places" element={<Places />} /> */}

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/users" element={<Users />} />
                <Route path="/places" element={<Places />} />
                <Route path="/places/add-places" element={<AddPlaces />} />
                <Route path="/places/edit-place" element={<EditPlace />} />
            </Route>
        </Routes>
    )
} 

export default AppRoutes;