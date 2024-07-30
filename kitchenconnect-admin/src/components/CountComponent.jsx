import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import styles from '../styles/countComponent.module.css'

const CountComponent = ({title, count}) =>{
    console.log(count)
    return(
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.count}>{count ? count : '-'}</div>
        </div>
    )
}


export default CountComponent