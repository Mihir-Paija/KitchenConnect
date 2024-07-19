import React from 'react';
import styles from '../styles/loadingComponent.module.css';

const LoadingComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingComponent;
