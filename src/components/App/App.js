import React, { Component } from 'react';

import imagesAPI from '../services/api';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    isImageModalOpen: false,
    modalImageSrc: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.getImages(query, page);
    }
  }

  getImages = async (query, page) => {
    const newImages = await imagesAPI.getImagesByQuery(query, page);

    if (
      newImages.hits.length < 0 ||
      newImages.total === this.state.images.length
    ) {
      this.setState({ isLoading: false });
      return;
    }

    this.setState(prevState => {
      return {
        images: [...prevState.images, ...newImages.hits],
      };
    });

    this.setState({ isLoading: false });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleGetImages = query => {
    this.setState({
      images: [],
      page: 1,
      query,
      isLoading: true,
    });
  };

  handleNextPage = e => {
    e.preventDefault();

    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        isLoading: true,
      };
    });
  };

  handleImageClick = src => {
    this.setState({ modalImageSrc: src, isImageModalOpen: true });
  };

  handleCloseImageModal = () => {
    this.setState({ isImageModalOpen: false });
  };

  render() {
    const { images, isLoading, isImageModalOpen, modalImageSrc } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onGetImages={this.handleGetImages} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {images.length > 0 && (
          <Button onClick={this.handleNextPage} isLoading={isLoading} />
        )}
        {isImageModalOpen && (
          <Modal src={modalImageSrc} onClose={this.handleCloseImageModal} />
        )}
      </div>
    );
  }
}

export default App;
