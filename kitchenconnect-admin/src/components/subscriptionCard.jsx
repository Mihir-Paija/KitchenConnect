import React from 'react';
import '../styles/SubscriptionCard.css'

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
    status: "Active" // Adding a status field to the dummy data
};

const SubscriptionCardComponent = () => {
    const { subscriberFirstName, subscriberLastName, kitchenName, tiffinType, tiffinName, subscription, startDate, endDate, noOfTiffins, status } = dummy_data;

    return (
        <div className="card">
            <h2 className="title">
                {subscription}
                <span className={`status-tag ${status.toLowerCase()}`}>{status}</span>
            </h2>
            <div className="field"><strong>Customer: </strong>{subscriberFirstName} {subscriberLastName}</div>
            <div className="field"><strong>Provider: </strong>{kitchenName}</div>
            <div>
            <h4> Subscription Details</h4>
                <div>{tiffinName} ({tiffinType}) x {noOfTiffins}</div>
                <div className="dates">
                <div><strong>Start Date: </strong>{startDate}</div>
                <div><strong>End Date: </strong>{endDate}</div>
            </div>
            </div>
        </div>
    );
};

export default SubscriptionCardComponent;
