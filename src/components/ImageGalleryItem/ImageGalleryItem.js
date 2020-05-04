import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onClick }) => {
  const { smallImg, largeImg, alt, key } = item;
  return (
    <li
      key={key}
      // role="presentation"
      onClick={onClick}
      className={styles.ImageGalleryItem}
    >
      <img
        src={smallImg}
        data-largeimg={largeImg}
        alt={alt}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    smallImg: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;