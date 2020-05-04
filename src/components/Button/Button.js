import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
  <div className={styles.container}>
    <button onClick={onClick} className={styles.Button} type="button">
      Load more
    </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;