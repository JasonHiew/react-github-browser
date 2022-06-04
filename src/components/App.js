import React, { useState, useEffect, useRef } from 'react';
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

  const { repos, org } = useSelector((state) => state);
  const { nextItemsBatch, isFetching, hasErrored, isEndOfCatalogue } = repos;

  const dispatch = useDispatch();

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Handle user scrolling the page
  function handleUserScroll() {
    // get scroll top value
    const scrollTop = document.documentElement.scrollTop;

    // get the entire height, including padding
    const scrollHeight = document.documentElement.scrollHeight;

    // check if user is near to the bottom of the body
    if (scrollTop + window.innerHeight + 20 >= scrollHeight) {
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
    dispatch(getSpecificRepo(repo.name));
    //TODO handle redirect in saga
  };

  return (
    <div className='gradient'>
      <div className='container mx-auto p-2 px-4 sm:w-3/4'>
        {org.items.length > 0 && !org.isFetching ? (
          <div className='my-5 flex flex-row rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600'>
            <>
              <img
                className='h-20 w-20 bg-gray-500 md:h-40 md:w-40'
                src={org.items[0].avatar_url}
                alt={`${org.items[0].name}`}
              />
              <div className='ml-5 flex flex-row items-center bg-white'>
                <h2 className='text-center text-2xl font-light md:text-5xl'>
                  {org.items[0].name} Repos
                </h2>
              </div>
            </>
          </div>
        ) : org.isFetching ? (
          <div className='my-5 flex animate-pulse flex-row rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600'>
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
        <div className='grid grid-flow-col grid-cols-10 gap-4'>
          <input
            type='text'
            placeholder='Search'
            className='no-focus-ring col-span-8 mb-5 rounded-xl border-2 border-gray-300 p-4 shadow-md shadow-slate-600 ring-0'
          />
          <button className='no-focus-ring col-span-2 mb-5 rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600'>
            Search
          </button>
        </div>
        {repos.items.length > 0 ? (
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
        ) : repos.isFetching || repos.items.length === 0 ? (
          [...Array(10)].map((data = 0, idx) => (
            <div
              key={idx}
              className='mb-2 flex h-20 animate-pulse flex-row items-center justify-between rounded-xl border-2 border-gray-300 bg-gray-500 p-4 shadow-md shadow-slate-600'
            >
              <div>
                <h3 className='w-1/2 bg-gray-500 font-bold'>{}</h3>
                <p className='w-80 break-words bg-gray-500 md:w-fit'></p>
              </div>
            </div>
          ))
        ) : repos.hasErrored ? (
          <p className='info-text'>Error...</p>
        ) : null}
      </div>
      {repos.items.length > 0 && (
        <>
          <button
            className='fixed bottom-6 right-2'
            onClick={handleScrollToTop}
          >
            Top
          </button>
          <div className='users-listing'>
            Showing {repos.items.length} repos
          </div>
        </>
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
    </div>
  );
};

export default App;
