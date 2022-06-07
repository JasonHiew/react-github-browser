import SearchBar from './SearchBar';
import SearchBtn from './SearchBtn';

const SearchRoot = ({
  repos,
  org,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleClearSearch,
}) => {
  return repos.items.length > 0 && org.items.length > 0 ? (
    <div className='search-root-container'>
      <div className='search-root-grid'>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDisabled={false}
        />
        <SearchBtn
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          isDisabled={false}
        />
      </div>
    </div>
  ) : (
    <div className='search-root-container'>
      <div className='search-root-grid animate-pulse'>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDisabled={true}
        />
        <SearchBtn
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export default SearchRoot;
