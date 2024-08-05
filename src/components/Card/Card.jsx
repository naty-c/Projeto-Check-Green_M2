import React from 'react';
import styles from './Card.module.css'; 

function Card({ title, total, iconElement: Icon }) {
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <h3>{title}</h3>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                    <Icon size={32} />
                </div>
                <div className={styles.cardCount}>
                    <p>{total}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;