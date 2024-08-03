import React from 'react';
import styles from '../styles/priceComponent.module.css'


const PaymentBreakdownComponent = ({ title, breakdown }) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>{title} Payment Breakdown</div>
            <p><strong>Order Price:</strong> ₹{breakdown.perOrderPrice}</p>
            <p><strong>Platform Charge :</strong> ₹{breakdown.platformCharge}</p>
            <p><strong>Tax :</strong> ₹{breakdown.tax}</p>
            <p><strong>Delivery Charge:</strong> ₹{breakdown.deliveryCharge}</p>
            <p><strong>Discount :</strong> - ₹{breakdown.discount}</p>
            <p><strong>Total :</strong> ₹{breakdown.total}</p>
        </div>
    )
}

export default PaymentBreakdownComponent