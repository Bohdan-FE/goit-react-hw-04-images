import { useState } from 'react';
import { Header } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <Header>
      <form type="submit" onSubmit={handleSubmit}>
        <button>
          <span>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={input}
        />
      </form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
