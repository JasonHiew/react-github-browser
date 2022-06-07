const { XCircleIcon, SearchIcon } = require('@primer/octicons-react');

const SearchBtn = ({ handleSearch, handleClearSearch, isDisabled }) => {
  return (
    <>
      <button
        className={`no-focus-ring ${
          isDisabled ? 'search-button-no-hover' : 'search-button-hover'
        }`}
        onClick={handleClearSearch}
        disabled={isDisabled}
      >
        <XCircleIcon
          size={24}
          verticalAlign='middle'
          className='text-red-600'
        />
      </button>
      <button
        className={`no-focus-ring ${
          isDisabled ? 'search-button-no-hover' : 'search-button-hover'
        }`}
        onClick={handleSearch}
        disabled={isDisabled}
      >
        <SearchIcon size={24} verticalAlign='middle' />
      </button>
    </>
  );
};

export default SearchBtn;
