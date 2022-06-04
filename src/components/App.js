import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRepos,
  addNextReposBatch,
  getOrg,
  getOrgSuccess,
  getSpecificRepo,
} from '../store/actions';

import '../styles.css';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const [isBottom, setIsBottom] = useState(false);

  const { repos, repoDetails, org } = useSelector((state) => state);
  const { nextItemsBatch, isFetching, hasErrored, isEndOfCatalogue } = repos;

  //TODO routes
  let navigate = useNavigate();
  let location = useLocation();

  const dispatch = useDispatch();

  // Handle user scrolling the page
  function handleUserScroll() {
    // get scroll top value
    const scrollTop = document.documentElement.scrollTop;

    // get the entire height, including padding
    const scrollHeight = document.documentElement.scrollHeight;

    // check if user is near to the bottom of the body
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  // on mount
  useEffect(() => {
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, []);

  // get data when page is loading
  useEffect(() => {
    dispatch(getRepos());
    dispatch(getOrg());
  }, [dispatch]);

  // handle re-rendering when users get to the bottom of the page
  useEffect(() => {
    if (isBottom) {
      if (nextItemsBatch.length) {
        // render the next batch of pre-fetched repos
        dispatch(addNextReposBatch());
      } else {
        // fetch another batch
        dispatch(getRepos());
      }
      setIsBottom(false);
    }
  }, [isBottom, nextItemsBatch, dispatch, setIsBottom]);

  const handleClick = (e, repo) => {
    // window.location.href = repo.name;

    dispatch(getSpecificRepo(repo.name));
    //TODO handle redirect in saga
  };

  return (
    <>
      <div className='container mx-auto p-2'>
        {org.items.length > 0 && !org.isFetching ? (
          <div className='my-5 flex flex-row rounded-xl border-2 border-gray-300 p-4 shadow-md shadow-slate-600'>
            <>
              <img
                className='h-20 w-20 bg-gray-500 md:h-40 md:w-40'
                src={org.items[0].avatar_url}
                alt={`${org.items[0].name}`}
              />
              <div className='ml-5 flex flex-row items-center'>
                <h2 className='text-center text-2xl font-light md:text-5xl'>
                  {org.items[0].name} Repos
                </h2>
              </div>
            </>
          </div>
        ) : org.isFetching ? (
          <div className='my-5 flex animate-pulse flex-row rounded-xl border-2 border-gray-300 p-4 shadow-md shadow-slate-600'>
            <>
              <div className='h-20 w-20 bg-gray-500 md:h-40 md:w-40'></div>
              <div className='ml-5 flex flex-row items-center'>
                <div className='w-1/2 bg-gray-500 text-center'></div>
              </div>
            </>
          </div>
        ) : org.hasErrored ? (
          <p className='info-text'>Error...</p>
        ) : null}
        {repos.items.map((repo, idx) => (
          <div
            key={idx}
            className='mb-2 flex flex-row items-center justify-between rounded-xl border-2 border-gray-300 p-4 shadow-md shadow-slate-600'
            onClick={(e) => handleClick(e, repo)}
          >
            <div style={{ marginLeft: '20px' }}>
              <h3 className='font-bold'>{repo.name}</h3>
              <p>{repo.description}</p>
            </div>
          </div>
        ))}
      </div>
      {repos.items.length > 0 && (
        <div className='users-listing'>Showing {repos.items.length} repos</div>
      )}
      {!repos.items.length && !isFetching ? (
        <p className='info-text'>Couldn't find any repos.</p>
      ) : isEndOfCatalogue ? (
        <p className='info-text'>Couldn't load any more repos.</p>
      ) : isFetching ? (
        <p className='info-text'>Loading repos...</p>
      ) : hasErrored ? (
        <p className='info-text'>
          There was an error while fetching repos data.
        </p>
      ) : null}
    </>
  );
};

export default App;
