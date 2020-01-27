import React, { Component } from 'react';

import imagesAPI from '../services/api';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';

import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
  };

  getImages = (query, page) => {
    imagesAPI.getImagesByQuery(query, page).then(data => {
      if (data.hits.length < 0) {
        console.log('Nothing Finde');
        return;
      }
      console.log('getImages: ', page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
        };
      });
    });
  };

  handleGetImages = async query => {
    await this.setState({
      images: [],
      page: 1,
      query,
    });

    const { page } = this.state;

    this.getImages(query, page);
  };

  handleNextPage = async e => {
    e.preventDefault();
    await this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });

    const { query, page } = this.state;
    console.log('handleNextPage: ', page);

    this.getImages(query, page);
  };

  render() {
    const { images } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onGetImages={this.handleGetImages} />
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && <Button onClick={this.handleNextPage} />}
      </div>
    );
  }
}

export default App;
