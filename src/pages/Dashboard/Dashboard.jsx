import 'leaflet/dist/leaflet.css';
import DashboardMap from '../../components/Map/DashboardMap';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashlist from '../../components/Dashlist/Dashlist';
import Card from '../../components/Card/Card';
import { UsersRound, MapPinned, TableProperties } from 'lucide-react';
import { useAuth } from '../../contexts/Auth';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [placeCount, setPlaceCount] = useState(0);
    const [viewMode, setViewMode] = useState('list');
    const { user } = useAuth();

    async function fetchUserCount() {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('No network response');
            }
            const data = await response.json();
            setUserCount(data.length);
        } catch (error) {
            console.log('Failed to fetch user count', error);
        }
    }

    async function fetchPlaceCount() {
        try {
            const response = await fetch('http://localhost:3000/places');
            if (!response.ok) {
                throw new Error('No network response');
            }
            const data = await response.json();
            setPlaceCount(data.length);
        } catch (error) {
            console.log('Failed to fetch place count', error);
        }
    }

    useEffect(() => {
        fetchUserCount();
        fetchPlaceCount();
    }, []);

    return (
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardMenu}>
                <Sidebar />
                </div>
                <main className={styles.mainContent}>
                    <h1>Lounge</h1>
                    <p>Welcome aboard, {user?.name || ''}!</p>

                        <div className={styles.cardsContainer}>
                            <Card title="Guides" total={userCount} iconElement={UsersRound} />
                            <Card title="Places" total={placeCount} iconElement={MapPinned} />
                        </div>

                        <div className={styles.listContainer}>
                            <h4>Check out the spots available to explore:</h4>
                            <div className={styles.mainView}>
                            <TableProperties 
                            className={`${styles.icon} ${viewMode === 'list' ? styles.active : ''}`}
                            onClick={() => setViewMode('list')}
                            />
                            <MapPinned 
                            className={`${styles.icon} ${viewMode === 'map' ? styles.active : ''}`}
                            onClick={() => setViewMode('map')}
                            />
                            </div>
                        </div>
                        <div className={styles.alternateView}>
                            {viewMode === 'list' ? <Dashlist /> : <DashboardMap />}
                        </div>
                </main>
            </div>
    );
}

export default Dashboard;
