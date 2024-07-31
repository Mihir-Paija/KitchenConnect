import React from 'react';
import styles from  '../styles/subOrderCard.module.css'
import PropTypes from 'prop-types'
import { formatDate, formatTimestampToDate } from '../utils/formateDateTime';

const TransactionCard = ({amount, type, orderDate}) => {


    return (
        <div className={styles.card}>
            <div className={styles.list}>
            <div className={styles.field}>{typeof orderDate === 'string' ? formatDate(orderDate) :  orderDate}</div>
            <div className={styles.field}>{type}</div>
            <div className={styles.field}>{amount !== null ? amount : '-'}</div>
            </div>
        </div>
    );
};

TransactionCard.propTypes = {
    orderDate: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  };

export default TransactionCard;
