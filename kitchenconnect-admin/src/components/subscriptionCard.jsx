import React from 'react';
import styles from '../styles/subscriptionCard.module.css'

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

const SubscriptionCardComponent = () => {
    const { subscriberFirstName, subscriberLastName, kitchenName, tiffinType, tiffinName, subscription, startDate, endDate, noOfTiffins, status } = dummy_data;

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>
                {subscription}
                <span className={`${styles['status-tag']} ${styles[status.toLowerCase()]}`}>{status}</span>
            </h2>
            <div className={styles.field}><strong>Customer: </strong>{subscriberFirstName} {subscriberLastName}</div>
            <div className={styles.field}><strong>Provider: </strong>{kitchenName}</div>
            <div>
            <h4> Subscription Details</h4>
                <div className={styles.field}>{tiffinName} ({tiffinType}) x {noOfTiffins}</div>
                <div className={styles.dates}>
                <div><strong>Start Date: </strong>{startDate}</div>
                <div><strong>End Date: </strong>{endDate}</div>
            </div>
            </div>
        </div>
    );
};

export default SubscriptionCardComponent;
