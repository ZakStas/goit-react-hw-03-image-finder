import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseOnEscape);
  }

  handleCloseOnEscape = ({ code }) => {
    if (code !== 'Escape') return;

    const { onClose } = this.props;
    onClose();
  };

  handleCloseOnClick = ({ target, currentTarget }) => {
    const { onClose } = this.props;
    if (currentTarget === target) {
      onClose();
    }
  };

  render() {
    const { src } = this.props;

    return (
      <div
        className={styles.Overlay}
        role="presentation"
        onClick={this.handleCloseOnClick}
      >
        <div className={styles.Modal}>
          <img src={src} alt="openImg" width="1000" height="800" />
        </div>
      </div>
    );
  }
}

export default Modal;