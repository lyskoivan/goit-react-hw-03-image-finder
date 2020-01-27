import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={styles['Button-wrapper']}>
      <button onClick={onClick} type="button" className={styles.Button}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
