const RepoCounter = ({ repos }) => {
  return (
    <div className='repos-listing'>
      Showing {repos.items.length}
      {` ${repos.isEndOfCatalogue ? ' / ' + repos.items.length : ' / ?'} repos`}
    </div>
  );
};

export default RepoCounter;
