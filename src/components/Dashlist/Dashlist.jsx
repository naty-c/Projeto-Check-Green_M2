import { useEffect, useState } from "react";
import styles from './Dashlist.module.css'; 
import { useAuth } from "../../contexts/Auth";

function Dashlist() {
    const [places, setPlaces] = useState([]);
    const [users, setUsers] = useState([]);
    const { user } = useAuth();

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

    const placeData = places.map(place => {
        // Check if the current place belongs to the logged-in user
        if (user && user.id === place.userId) {
            return { ...place, guideName: user.name };
        }

        // Find the corresponding user from the users array
        const guide = users.find(u => u.id === place.userId);
        return {
            ...place,
            guideName: guide ? guide.name : 'Admin'
        };
    });

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
                {placeData.map(place => (
                            <tr key={place.id}>
                                {/* <td>{place.id}</td> */}
                                <td>{place.name}</td>
                                <td>{place.guideName}</td>
                        </tr>
                ))}
                </tbody>
                
            </table>
        </div>
    )
}

export default Dashlist;