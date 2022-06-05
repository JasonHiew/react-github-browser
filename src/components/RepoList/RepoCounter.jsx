const RepoCounter = ({ repos }) => {
  return (
    <div className='repos-listing'>
      Showing {repos.items.length}
      {` ${
        repos.isEndOfCatalogue || repos?.totalCount > 0
          ? ' / ' + (repos?.totalCount ? repos?.totalCount : repos.items.length)
          : ' / ?'
      } repos`}
    </div>
  );
};

export default RepoCounter;
