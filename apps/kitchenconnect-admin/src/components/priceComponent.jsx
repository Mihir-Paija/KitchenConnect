import React from 'react';
import styles from '../styles/priceComponent.module.css'


const PriceComponent = ({price}) =>{
    return (
        <div className={styles.card}>
        <div className={styles.title}>Price</div>
        <p><strong>Tiffin Price:</strong> ₹{price.tiffinPrice}</p>
        <p><strong>Delivery Charge:</strong> ₹{price.deliveryCharge}</p>
        <p><strong>Platform Commission:</strong> {price.platformCommission * 100}%</p>
        <p><strong>GST on Tiffin:</strong> {price.GST_on_tiffin * 100}%</p>
        <p><strong>GST on Service:</strong> {price.GST_on_service * 100}%</p>
        <p><strong>Service Discount:</strong> ₹{price.serviceDiscount}</p>
        <p><strong>Kitchen Discount:</strong> ₹{price.kitchenDiscount}</p>
        {/* <p><strong>Total:</strong> ₹{customerPaymentBreakdown.total}</p> */}
      </div>
    )
}

export default PriceComponent