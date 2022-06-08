const RepoCounter = ({ repos }) => {
  return repos?.searchedname || repos?.totalCount > 0 ? (
    <div className='repos-listing'>Found {repos?.totalCount} results</div>
  ) : (
    <div className='repos-listing'>
      Showing {repos.items.length}
      {` ${repos.isEndOfCatalogue ? ' / ' + repos.items.length : ' / ?'} repos`}
    </div>
  );
};

export default RepoCounter;
