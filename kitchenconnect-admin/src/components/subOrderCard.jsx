import React from 'react';
import styles from  '../styles/subOrderCard.module.css'
import PropTypes from 'prop-types'

const SubOrderCard = ({orderDate, status, amount}) => {
    return (
        <div className={styles.card}>
            <div className={styles.list}>
            <div className={styles.field}>{orderDate}</div>
            <div className={styles.field}>{status}</div>
            <div className={styles.field}>{amount !== null ? amount : '-'}</div>
            </div>
        </div>
    );
};

SubOrderCard.propTypes = {
    orderDate: PropTypes.node.isRequired,
    status: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
  };

export default SubOrderCard;
