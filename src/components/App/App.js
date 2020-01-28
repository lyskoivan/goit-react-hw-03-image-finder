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

  getImages = (query, page) => {
    imagesAPI
      .getImagesByQuery(query, page)
      .then(data => {
        if (data.hits.length < 0) {
          return;
        }
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
          };
        });
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleGetImages = async query => {
    await this.setState({
      images: [],
      page: 1,
      query,
      isLoading: true,
    });

    const { page } = this.state;

    this.getImages(query, page);
  };

  handleNextPage = async e => {
    e.preventDefault();
    await this.setState(prevState => {
      return {
        page: prevState.page + 1,
        isLoading: true,
      };
    });

    const { query, page } = this.state;

    this.getImages(query, page);
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
