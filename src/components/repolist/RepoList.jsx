const RepoList = ({ repos, handleClick }) => {
  return repos.items.length > 0 ? (
    repos.items.map((repo, idx) => (
      <div
        key={idx}
        className='repo-list-item-hover'
        onClick={(e) => handleClick(e, repo)}
      >
        <div>
          <h3 className='repo-list-item-title'>{repo.name}</h3>
          <p className='repo-list-item-description'>{repo.description}</p>
        </div>
      </div>
    ))
  ) : repos.isFetching && repos.items.length === 0 ? (
    // This is the skeleton for the loading state
    [...Array(8)].map((data = 0, idx) => (
      <div key={idx} className='repo-list-item-no-hover animate-pulse'>
        <div>
          <div className='repo-list-item-skeleton-title'></div>
          <div className='repo-list-item-skeleton-description'></div>
        </div>
      </div>
    ))
  ) : repos.hasErrored ? (
    <p className='info-text'>Error...</p>
  ) : null;
};

export default RepoList;
