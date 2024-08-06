import 'leaflet/dist/leaflet.css';
import Map from '../../components/Map/Map';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashlist from '../../components/Dashlist/Dashlist';
import Card from '../../components/Card/Card';
import { UsersRound, MapPinned, TableProperties } from 'lucide-react';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [placeCount, setPlaceCount] = useState(0);
    const [viewMode, setViewMode] = useState('list');

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
            <Sidebar />
            <main className={styles.mainContent}>
                <h1>Lounge</h1>
                <p>Welcome aboard!</p>
                    <div className={styles.cardsContainer}>
                        <Card title="Guides" total={0} iconElement={UsersRound} />
                        <Card title="Places" total={0} iconElement={MapPinned} />
                    </div>

                    <div className={styles.listContainer}>
                        <h3>Check out the spots available to explore:</h3>
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
                <div>
                    {viewMode === 'list' ? <Dashlist /> : <Map />}
                </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
