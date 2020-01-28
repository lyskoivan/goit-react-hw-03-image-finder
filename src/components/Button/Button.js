import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'react-loader-spinner';

import styles from './Button.module.css';

const Button = ({ onClick, isLoading }) => {
  return (
    <div className={styles['Button-wrapper']}>
      {isLoading ? (
        <Loader type="ThreeDots" color="coral" height={80} width={80} />
      ) : (
        <button onClick={onClick} type="button" className={styles.Button}>
          Load More
        </button>
      )}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Button;
