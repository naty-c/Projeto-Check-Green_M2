import Sidebar from '../../components/Sidebar/Sidebar';
import { SmilePlus } from 'lucide-react';
import styles from './Users.module.css';

function Users() {
  return (
    
    <div className={styles.container}>
      <Sidebar />
      
    <main className={styles.usersContainer}>
        <h1>Guides</h1>
        <p>Coming soon, after planning the next trip... <SmilePlus /></p>
    </main>
    </div>
  );
};

export default Users;
