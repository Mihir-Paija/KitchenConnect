import React from 'react';
import styles from '../styles/subscriptionCard.module.css'
import { formatDate } from '../../utils/formatDateTime';

const dummy_data = {
    subscriberFirstName: "John",
    subscriberLastName: "Doe",
    kitchenName: "ABC Kitchen",
    subscription: "Monthly",
    tiffinName: 'Full Tiffin',
    tiffinType: 'Lunch',
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    noOfTiffins: 20,
    status: "Active" 
};

const SubscriptionCard = ({details}) => {
    //const { subscriberFirstName, subscriberLastName, kitchenName, tiffinType, tiffinName, subscription, startDate, endDate, noOfTiffins, status } = dummy_data;

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>
                {details.subscription}
                <span className={`${styles['status-tag']} ${styles[details.status.toLowerCase()]}`}>{details.status}</span>
            </h2>
            <div className={styles.field}><strong>Customer: </strong>{details.customerName}</div>
            <div className={styles.field}><strong>Provider: </strong>{details.providerName}</div>
            <div>
            <h4> Subscription Details</h4>
                <div className={styles.field}>{details.tiffinName} ({details.tiffinType}) x {details.noOfTiffins}</div>
                <div className={styles.dates}>
                <div><strong>Start Date: </strong>{formatDate(details.startDate)}</div>
                <div><strong>End Date: </strong>{formatDate(details.endDate)}</div>
            </div>
            </div>
        </div>
    );
};

export default SubscriptionCard;
