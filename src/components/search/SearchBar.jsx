const SearchBar = ({ searchQuery, setSearchQuery, isDisabled }) => {
  return (
    <input
      type='text'
      placeholder='Search'
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
      disabled={isDisabled}
      className='no-focus-ring col-span-5 mb-5 rounded-xl border-2 border-gray-300 p-4 shadow-md shadow-slate-600 ring-0'
    />
  );
};

export default SearchBar;
