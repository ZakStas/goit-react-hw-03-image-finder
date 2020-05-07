import React, { Component } from 'react';
import uuid from 'uuid';
import styles from './styles.css';
import * as Api from '../services/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const mapper = items => {
  return items.map(
    ({
      webformatURL: smallImg,
      largeImageURL: largeImg,
      tags: alt,
      id: key,
      ...props
    }) => ({
      smallImg,
      largeImg,
      alt,
      key,
      ...props,
    }),
  );
};

class App extends Component {
  state = {
    items: [],
    isLoading: false,
    pageNumber: 1,
    searchQuery: '',
    isOpenModal: false,
    openImg: '',
  };

  componentDidMount() {
    const { searchQuery, pageNumber } = this.state;
    this.fetchArticles(searchQuery, pageNumber);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber
    ) {
      this.fetchArticles(searchQuery, pageNumber);
    }   
  }
  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollTop +
      document.documentElement.clientHeight -
      140,
      behavior: 'smooth',
    });
  }

  fetchArticles = (query, page) => {
    this.setState({ isLoading: true });

    Api.getItems(query, page)
      .then(({ data }) => {
        this.setState(prevState => ({
          items: [...prevState.items, ...mapper(data.hits)],
        }));
      })
      .then(() => 
          this.scrollDown())
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, pageNumber: 1, items: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  

  handleOpenModal = ({ target }) => {
    this.setState({ isOpenModal: true, openImg: target.dataset.largeimg });
    
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { items, isLoading, isOpenModal, openImg } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        {items.length && (
          <>
            <ImageGallery>
              {items.map(item => (
                <ImageGalleryItem
                  key={uuid()}
                  item={item}
                  onClick={this.handleOpenModal}
                />
              ))}
            </ImageGallery>
            <Button onClick={this.handleLoadMore} />
          </>
        )}
        {isOpenModal && <Modal onClose={this.handleCloseModal} src={openImg} />}
      </div>
    );
  }
}
export default App;