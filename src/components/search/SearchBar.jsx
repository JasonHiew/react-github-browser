const SearchBar = ({ searchQuery, setSearchQuery, isDisabled }) => {
  return (
    <input
      type='text'
      placeholder='Search Repos'
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
      disabled={isDisabled}
      className='no-focus-ring search-bar-input'
    />
  );
};

export default SearchBar;
