import { fetchItems } from 'api/api';
import { SearchBar } from './Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';

export const App = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (value) {
      const getItems = async () => {
        setLoader(true);
        try {
          const items = await fetchItems(value, page);
          setItems(prev => [...prev, ...items.hits]);
          setShowBtn(page < Math.ceil(items.totalHits / 20));
        } catch (error) {
          console.log(error);
        } finally {
          setLoader(false);
        }
      };
      getItems();
    }
  }, [page, value]);

  const handleSubmit = data => {
    setValue(data);
    setPage(1);
    setItems([]);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const handleZoom = (url, tag) => {
    setIsModalActive(true);
    setLargeImage(url);
    setTag(tag);
  };

  const handleCloseModal = e => {
    setIsModalActive(false);
    setLargeImage('');
    setTag('');
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery items={items} handleZoom={handleZoom} />
      {loader && <Loader />}
      {showBtn && <Button onClick={handleClick} />}
      {isModalActive && (
        <Modal
          largeImg={largeImage}
          tag={tag}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};
