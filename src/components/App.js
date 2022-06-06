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
import RepoList from 'components/repolist/RepoList';
import RepoResult from 'components/repolist/RepoResult';
import RepoCounter from 'components/repolist/RepoCounter';
import SearchRoot from 'components/search/SearchRoot';

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
    if (searchQuery.length === 0) return;
    dispatch(searchRepo(searchQuery));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(clearSearchRepo());
  };

  return (
    <Layout layout='home'>
      <div className='details-container'>
        {org.items.length > 0 && !org.isFetching ? (
          <div className='my-5 flex flex-row items-stretch gap-x-3 rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md shadow-slate-600'>
            <div className='flex basis-1/3 flex-row justify-center rounded-xl bg-white p-4 shadow-lg shadow-slate-600'>
              <img
                className='my-2 h-20 w-20 rounded-md bg-gray-500 md:h-40 md:w-40'
                src={org.items[0].avatar_url}
                alt={`${org.items[0].name}`}
              />
            </div>
            <div className='flex basis-2/3 flex-row items-center rounded-xl bg-white p-4 shadow-lg shadow-slate-600'>
              <div className='flex justify-center text-left text-2xl font-bold md:text-5xl'>
                <span className='block w-3/4 font-mono leading-none [text-shadow:0_4px_8px_rgba(0,0,0,0.3)]'>
                  {org.items[0].name} Repos
                </span>
              </div>
            </div>
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

        <SearchRoot
          repos={repos}
          org={org}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
        />

        {/* <div className='grid grid-flow-col grid-cols-9 gap-4'>
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
        </div> */}

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
          {searchRepos.searchedName === '' ? (
            <RepoCounter repos={repos} />
          ) : (
            <RepoCounter repos={searchRepos} />
          )}
        </>
      )}
      {searchRepos.searchedName === '' ? (
        <RepoResult repos={repos} />
      ) : (
        <RepoResult repos={searchRepos} />
      )}
    </Layout>
  );
};

export default App;
