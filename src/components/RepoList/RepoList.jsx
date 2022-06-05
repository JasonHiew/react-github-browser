const RepoList = ({ repos, handleClick }) => {
  console.log('RepoList redux state : ' + JSON.stringify(repos));
  return repos.items.length > 0 ? (
    repos.items.map((repo, idx) => (
      <div
        key={idx}
        className='mb-2 flex flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600 hover:translate-y-1 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-100 hover:shadow-inner'
        onClick={(e) => handleClick(e, repo)}
      >
        <div>
          <h3 className='font-bold'>{repo.name}</h3>
          <p className='w-80 break-words md:w-fit'>{repo.description}</p>
        </div>
      </div>
    ))
  ) : repos.isFetching && repos.items.length === 0 ? (
    [...Array(10)].map((data = 0, idx) => (
      <div
        key={idx}
        className='mb-2 flex h-20 animate-pulse flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-gray-500 p-4 shadow-md shadow-slate-600'
      >
        <div>
          <h3 className='w-40 bg-gray-500 font-bold md:w-fit'>{}</h3>
          <p className='w-40 break-words bg-gray-500 md:w-fit'></p>
        </div>
      </div>
    ))
  ) : repos.hasErrored ? (
    <p className='info-text'>Error...</p>
  ) : repos?.totalCount === 0 ? (
    <p className='info-text'>No result...</p>
  ) : null;
};

export default RepoList;
