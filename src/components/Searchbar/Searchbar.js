import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onGetImages: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChangeQuery = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmitSearchForm = e => {
    e.preventDefault();
    const { query } = this.state;
    if (!query) {
      console.log('Type some query');
      return;
    }
    const { onGetImages } = this.props;
    onGetImages(query.toLowerCase());

    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form
          onSubmit={this.handleSubmitSearchForm}
          className={styles.SearchForm}
        >
          <input
            onChange={this.handleChangeQuery}
            value={query}
            type="text"
            className={styles.SearchForm_input}
            placeholder="Search images and photos"
            autoComplete="off"
          />
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
