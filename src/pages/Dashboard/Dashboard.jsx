import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { UsersRound, MapPinned } from 'lucide-react';
import styles from './Dashboard.module.css';

function Dashboard() {

    const [list, setList] = useState([]);

    async function loadPlaces() {
        try {
            const response = await fetch('http://localhost:3000/places');
            if (!response.ok) {
                throw new Error('No network response');
            }
            const data = await response.json();
            setList(data);
        } catch (error) {
            console.log('Failed to fetch places', error);
        }
    }

    useEffect(() => {
        loadPlaces()
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <main className={styles.mainContent}>
                <h1>Lounge</h1>
                <p>Welcome aboard!</p>

                    <div className={styles.cardsContainer}>
                        <div className={styles.cardUsers}>
                            <h2>Users</h2>
                        </div>
                        <div className={styles.cardPlaces}>
                            <h2>Places</h2>
                        </div>
                        {/* <Card title="Users" total={0} iconElement={UsersRound} />
                        <Card title="Places" total={0} iconElement={MapPinned} /> */}
                    </div>

                    <div className={styles.listContainer}>
                        <h3>List of Places</h3>
                        <div>

                    {/* <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Local</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>

                        {
                            list.map((place) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.id}</td>
                                    <td>{place.name}</td>
                                    <td>{user.name}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table> */}
                </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;