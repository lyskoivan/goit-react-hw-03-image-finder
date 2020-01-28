import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('mousedown', this.handleBackdropClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
    window.removeEventListener('mousedown', this.handleBackdropClick);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;

    this.props.onClose();
  };

  handleBackdropClick = e => {
    const { current } = this.backdropRef;

    if (current && e.target !== current) {
      return;
    }

    this.props.onClose();
  };

  render() {
    const { src } = this.props;
    return (
      <div className={styles.Overlay} ref={this.backdropRef}>
        <div>
          <img src={src} alt="" className={styles.Modal} />
        </div>
      </div>
    );
  }
}
