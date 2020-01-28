import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt=""
        className={styles.ImageGalleryItem_image}
        onClick={onClick}
        role="presentation"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
