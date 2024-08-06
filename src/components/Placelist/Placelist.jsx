import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react'; 
import { deletePlace } from '../../service/placesService';
import styles from './Placelist.module.css';

function Placelist() {
    const [places, setPlaces] = useState([]);
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

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

    async function handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this place?')) {
            try {
                const message = await deletePlace(id);
                setSuccessMessage(message);
                alert('Place successfully removed!');
                setPlaces(places.filter(place => place.id !== id));
            } catch (error) {
                console.error('Error deleting place', error);
                alert('Failed to delete place');
            }
        }
    };

    useEffect(() => {
        loadPlaces();
        loadUsers();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <table border="1">
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Category</th> 
                        <th>Guide</th>
                        <th>Actions</th> 
                    </tr>
                </thead>

                <tbody>
                    {places.map(place => {
                        const user = users.find(user => user.id === place.userId);
                        return (
                            <tr key={place.id}>
                            <td>{place.name}</td>
                            <td>{place.category}</td> 
                            <td>{user ? user.name : 'Admin'}</td>
                            <td>
                                <Link to={`/edit-place/${place.id}`}>
                                    <button className={styles.button}>
                                        <Pencil className={styles.icon} />
                                    </button>
                                </Link>
                                <button className={styles.button} onClick={() => handleDelete(place.id)}>
                                    <Trash2 className={styles.icon} />
                                </button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>

            </table>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        </div>
    )
}

export default Placelist;
