import 'leaflet/dist/leaflet.css';
import PlacesMap from '../../components/Map/PlacesMap';
import Placelist from '../../components/Placelist/Placelist';
import Sidebar from '../../components/Sidebar/Sidebar';
import BackButton from '../../components/Button/BackButton';
import { PartyPopper, TableProperties, MapPinned } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Places.module.css';

function Places() {
    const [viewMode, setViewMode] = useState('list');
    return (
    
        <div className={styles.placesContainer}>
            <div className={styles.placesMenu}>
            <Sidebar />
            </div>
            <main className={styles.mainContent}>
                <div className={styles.mainHeader}>
                    <h1>Places</h1>
                    <div className={styles.mainText}>
                    <p>Favorite spots already shared with the world <PartyPopper className={styles.iconParty} /></p> 
                        <Link className={styles.link} to="/add-places">
                            <button>Add a Spot</button>
                        </Link>
                    </div>
                </div>
                <div className={styles.mainView}>
                    <TableProperties 
                    className={`${styles.icon} ${viewMode === 'list' ? styles.active : ''}`}
                    onClick={() => setViewMode('list')}
                    />
                    <MapPinned 
                    className={`${styles.icon} ${viewMode === 'map' ? styles.active : ''}`}
                    onClick={() => setViewMode('map')}
                    />
                    <BackButton />
                </div>
                <div className={styles.alternateView}>
                    {viewMode === 'list' ? <Placelist /> : <PlacesMap />}
                </div>
            </main>
        </div>
    )
}

export default Places;


