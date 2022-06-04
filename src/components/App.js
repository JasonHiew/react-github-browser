import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRepos, addNextReposBatch, getOrg } from "../store/actions";

import "../styles.css";

const App = () => {
  const [isBottom, setIsBottom] = useState(false);

  const { repos, org } = useSelector((state) => state);
  const { nextItemsBatch, isFetching, hasErrored, isEndOfCatalogue } = repos;

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
    window.addEventListener("scroll", handleUserScroll);
    return () => window.removeEventListener("scroll", handleUserScroll);
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

  return (
    <>
      <div>
        {org.items.length && (
          <img src={org.items[0].avatar_url} alt={`${org.items[0].name}`} />
        )}

        <h2 className="page-title">React Community Repos</h2>
        {repos.items.map((repo, idx) => (
          <div key={idx} className="item-container">
            <div style={{ marginLeft: "20px" }}>
              <h3>{repo.name}</h3>
              <p>
                {/* <small>{repo.login.username}</small> */}
                <br />
                <b>{repo.description}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
      {repos.items.length && (
        <div className="users-listing">Showing {repos.items.length} repos</div>
      )}
      {!repos.items.length && !isFetching ? (
        <p className="info-text">Couldn't find any repos.</p>
      ) : isEndOfCatalogue ? (
        <p className="info-text">Couldn't load any more repos.</p>
      ) : isFetching ? (
        <p className="info-text">Loading...</p>
      ) : hasErrored ? (
        <p className="info-text">
          There was an error while fetching repos data.
        </p>
      ) : null}
    </>
  );
};

export default App;
