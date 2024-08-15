import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    async function signIn({ email, password }) {
        try {
            const loginResponse = await axios.post('http://localhost:3000/login', { email, password });
            const loginData = loginResponse.data;
    
            if (loginData && loginData.email) {
                const userResponse = await axios.get('http://localhost:3000/users', {
                    params: { email: loginData.email }
                });
    
                const [userData] = userResponse.data;
    
                if (userData) {
                    if (userData.password === password) {
                        localStorage.setItem('user', JSON.stringify(userData));
                        setUser(userData);
                        navigate('/dashboard');
                    } else {
                        console.error('Incorrect password');
                        alert('Incorrect password');
                    }
                } else {
                    console.error('User not found');
                    alert('User not found');
                }
            }
        } catch (error) {
            console.error('Authentication failed', error);
            alert('Authentication failed');
        }
    }

    function signOut() {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
