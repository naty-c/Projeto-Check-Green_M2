import { Link, useLocation } from 'react-router-dom';
import { House, User, LandPlot, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/Auth';
import styles from './Sidebar.module.css';

function Sidebar() {
    const location = useLocation();
    const { signOut } = useAuth();
  
    const isActive = (path) => location.pathname === path;

    function handleLogout() {
        signOut();
    }

    return (
            <header className={styles.header}>            
                <nav className={styles.sidebar}>
                    <h2>Check Green</h2> 
                    <div className={styles.sidebarLinks}>
                    <ul>
                        <li><Link to="/dashboard" 
                            className={`${styles.link} ${isActive('/dashboard') ? styles.activeLink : ''}`}><House /><span>Lounge</span></Link></li>
                        <li><Link to="/users" 
                            className={`${styles.link} ${isActive('/users') ? styles.activeLink : ''}`}><User /><span>Guides</span></Link></li>
                        <li><Link to="/places" 
                            className={`${styles.link} ${isActive('/places') ? styles.activeLink : ''}`}><LandPlot /><span>Places</span></Link></li>
                    </ul>
                    </div>
                    <div className={styles.sidebarLogout}>
                    <ul>
                        <li>
                            <button onClick={handleLogout} className={styles.link}>
                                <LogOut /><span>Land</span>
                            </button>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>
        );
}

export default Sidebar;