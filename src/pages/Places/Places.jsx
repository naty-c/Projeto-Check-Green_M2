import Placelist from '../../components/Placelist/Placelist';
import Sidebar from '../../components/Sidebar/Sidebar';
import { PartyPopper, TableProperties, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Places.module.css';

function Places() {

    return (
    
        <div className={styles.container}>
            <Sidebar />
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
                    <TableProperties className={styles.icon} />
                    <MapPinned className={styles.icon} />
                </div>
                <div>
                    <Placelist />
                </div>
            </main>
        </div>
    )
}

export default Places;

