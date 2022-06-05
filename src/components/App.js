import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRepos,
  addNextReposBatch,
  getOrg,
  getSpecificRepo,
  searchRepo,
  clearSearchRepo,
} from 'store/actions';
import Layout from 'components/Layout';

import 'styles/styles.css';

import useScrollPosition from '@react-hook/window-scroll';
import { SearchIcon, XCircleIcon } from '@primer/octicons-react';
import RepoList from './RepoList/RepoList';

const App = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { repos, org, searchRepos } = useSelector((state) => state);
  const { nextItemsBatch, isFetching, hasErrored, isEndOfCatalogue } = repos;

  // Handle scroll to top button
  const scrollY = useScrollPosition(1 /*fps*/);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

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

  useEffect(() => {
    if (scrollY > 0) {
      setShowScrollTopBtn(true);
    } else {
      setShowScrollTopBtn(false);
    }
  }, [scrollY]);

  const handleClick = (e, repo) => {
    dispatch(getSpecificRepo(repo.name));
    //TODO handle redirect in saga
  };

  const handleSearch = () => {
    dispatch(searchRepo(searchQuery));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchRepo());
  };

  return (
    <Layout layout='home'>
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
                <h2 className='text-center text-2xl font-bold md:text-5xl'>
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
        <div className='grid grid-flow-col grid-cols-9 gap-4'>
          <input
            type='text'
            placeholder='Search'
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className='no-focus-ring col-span-5  mb-5 rounded-xl border-2 border-gray-300 p-4 shadow-md shadow-slate-600 ring-0'
          />
          <button
            className='no-focus-ring gap col-span-2 mb-5 rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600 hover:translate-y-1 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-100 hover:shadow-inner md:col-span-1'
            onClick={handleClearSearch}
          >
            <XCircleIcon size={16} verticalAlign='middle' />
          </button>
          <button
            className='no-focus-ring col-span-2 mb-5 rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600 hover:translate-y-1 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-100 hover:shadow-inner md:col-span-1'
            onClick={handleSearch}
          >
            <SearchIcon size={16} verticalAlign='middle' />
          </button>
        </div>
        {/* RepoList: Loads / maps all repos as a list with an onClick function.*/}
        {/* Takes repos object from "repos" redux state and handleClick function.*/}
        {/* The condition to determine if user is searching or showing all is by checking*/}
        {/* the "searchQuery" (Search Box value) state*/}
        {searchRepos.searchedName === '' ? (
          <RepoList repos={repos} handleClick={handleClick} />
        ) : (
          <RepoList repos={searchRepos} handleClick={handleClick} />
        )}
      </div>
      {repos.items.length > 0 && (
        <>
          <button
            className={`fixed bottom-9 right-6 rounded-full border-2 border-gray-300 bg-gray-300 p-2 shadow-md shadow-slate-600 ${
              showScrollTopBtn ? 'visible' : 'invisible'
            }`}
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
        <p className='info-text'>Loaded all repos.</p>
      ) : isFetching ? (
        <p className='info-text'>Loading repos...</p>
      ) : hasErrored ? (
        <p className='info-text'>
          There was an error while fetching repos data.
        </p>
      ) : null}
    </Layout>
  );
};

export default App;
