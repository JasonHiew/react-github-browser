const RepoResult = ({ repos }) => {
  return !repos.items.length && !repos.isFetching ? (
    <p className='info-text'>Couldn't find any repos.</p>
  ) : repos.isEndOfCatalogue && repos.items.length > 0 ? (
    <p className='info-text'>Loaded all repos.</p>
  ) : repos.isFetching ? (
    <p className='info-text'>Loading repos...</p>
  ) : repos.hasErrored ? (
    <p className='info-text'>There was an error while fetching repos data.</p>
  ) : null;
};

export default RepoResult;
