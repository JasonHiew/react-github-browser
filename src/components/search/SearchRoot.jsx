import { SearchIcon, XCircleIcon } from '@primer/octicons-react';
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
    <div className='flex justify-end'>
      <div className='grid grid-cols-9 gap-2 md:grid-cols-7'>
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
    <div className='flex justify-end'>
      <div className='grid animate-pulse grid-cols-9 gap-2 md:grid-cols-7'>
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
