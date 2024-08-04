import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext({
    user: null,
    signIn: () => {},
    signOut: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    async function signIn({ email, password }) {
        try {
            const response = await axios.post('http://localhost:3000/users', { email, password });
            const data = response.data;

            console.log('API response', data); // Testing

            if (data && data.email && data.password) {
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                navigate('/dashboard');
            } else {
                console.error('Invalid user data from API')
            }
          } catch (error) {
            console.error('Authentication failed', error);
          }
    };

        function signOut() {
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
          };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
  }