import { Link } from 'react-router-dom';
import { House, User, LandPlot, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

function Sidebar() {
    return (
            <header className={styles.header}>            
                <nav className={styles.sidebar}>
                    <h2>Check Green</h2> 
                    <div className={styles.sidebarLinks}>
                    <ul>
                        <li><Link to="/dashboard" className={styles.link}><House />Lounge</Link></li>
                        <li><Link to="/users" className={styles.link}><User />Guides</Link></li>
                        <li><Link to="/places" className={styles.link}><LandPlot />Places</Link></li>
                    </ul>
                    </div>
                    <div className={styles.sidebarLogout}>
                    <ul>
                        <li><Link to="/" className={styles.link}><LogOut />Land</Link></li>
                    </ul>
                    </div>
                </nav>
            </header>
        );
}

export default Sidebar;