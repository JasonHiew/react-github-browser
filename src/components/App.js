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
import Layout from 'components/layout/Layout';

import 'styles/styles.css';

import useScrollPosition from '@react-hook/window-scroll';
import RepoList from 'components/repolist/RepoList';
import RepoResult from 'components/repolist/RepoResult';
import RepoCounter from 'components/repolist/RepoCounter';
import SearchRoot from 'components/search/SearchRoot';
import ScrollToTopBtn from './repolist/ScrollToTopBtn';
import OrgList from './orglist/OrgList';

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
    if (scrollTop + window.innerHeight + 40 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  // on mount
  useEffect(() => {
    handleScrollToTop();
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, []);

  // get data when page is loading
  useEffect(() => {
    dispatch(getRepos());
    dispatch(getOrg());
    // const resetOnUnmount = () => {
    //   dispatch(getRepos());
    //   dispatch(getOrg());
    // }; //Trying to fix the double mounting bug
    // return resetOnUnmount;
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
  };

  const handleSearch = () => {
    if (searchQuery.length === 0) {
      dispatch(clearSearchRepo());
    }
    dispatch(searchRepo(searchQuery));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(clearSearchRepo());
  };

  return (
    <Layout layout='home'>
      <div className='details-container'>
        {/* OrgList: Display organization details */}
        {/* Takes org object from "org" redux state*/}
        <OrgList org={org} />
        {/* SearchRoot: Display search function */}
        {/* Takes repos and org object from "repos" and "org" redux state,*/}
        {/* searchQuery and setSearchQuery useState hook,*/}
        {/* handleSearch and setSearchQuery functions*/}
        <SearchRoot
          repos={repos}
          org={org}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
        />

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
          {/* ScrollToTopBtn: Shows the scroll to top btn when page is not at the top of page */}
          {/* Takes showScrollTopBtn useState hook and handleScrollToTop function*/}
          <ScrollToTopBtn
            showScrollTopBtn={showScrollTopBtn}
            handleScrollToTop={handleScrollToTop}
          />
          {/* RepoCounter: Shows the number of repos loaded based on current action (normal or searching) */}
          {searchRepos.searchedName === '' ? (
            <RepoCounter repos={repos} />
          ) : (
            <RepoCounter repos={searchRepos} />
          )}
        </>
      )}
      {/* RepoResult: Shows the the result of current action (normal or searching) whether results were shown or not */}
      {searchRepos.searchedName === '' ? (
        <RepoResult repos={repos} />
      ) : (
        <RepoResult repos={searchRepos} />
      )}
    </Layout>
  );
};

export default App;
