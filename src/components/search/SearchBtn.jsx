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
        <XCircleIcon size={16} verticalAlign='middle' />
      </button>
      <button
        className={`no-focus-ring ${
          isDisabled ? 'search-button-no-hover' : 'search-button-hover'
        }`}
        onClick={handleSearch}
        disabled={isDisabled}
      >
        <SearchIcon size={16} verticalAlign='middle' />
      </button>
    </>
  );
};

export default SearchBtn;
