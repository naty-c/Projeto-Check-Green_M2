import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth'
import AppRoutes from './routes/Routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
