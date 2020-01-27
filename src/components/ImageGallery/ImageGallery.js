import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} src={image.webformatURL} />;
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ImageGallery;
