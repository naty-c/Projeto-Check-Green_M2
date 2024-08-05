import { useEffect, useState } from "react";
import styles from './Dashlist.module.css'; 

function Dashlist() {
    const [places, setPlaces] = useState([]);
    const [users, setUsers] = useState([]);

    async function loadPlaces() {
        try {
            const response = await fetch('http://localhost:3000/places');
            if (!response.ok) {
                throw new Error('No network response');
            }
            const data = await response.json();
            setPlaces(data);
        } catch (error) {
            console.log('Failed to fetch places', error);
        }
    }

    async function loadUsers() {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('No network response');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log('Failed to fetch users', error);
        }
    }

    useEffect(() => {
        loadPlaces();
        loadUsers();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <table border="1">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Place</th>
                        <th>Guide</th>
                    </tr>
                </thead>

                <tbody>
                {places.map(place => {
                        const user = users.find(user => user.id === place.userId);
                        return (
                            <tr key={place.id}>
                                {/* <td>{place.id}</td> */}
                                <td>{place.name}</td>
                                <td>{user ? user.name : 'Admin'}</td>
                        </tr>
                    );
                })}
                </tbody>
                
            </table>
        </div>
    )
}

export default Dashlist;