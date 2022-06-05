import { useDispatch, useSelector } from 'react-redux';
import ErrorBox from 'components/common/boxes/ErrorBox';
import RepoHoverBtn from 'components/common/links/RepoHoverBtn';
import Layout from 'components/Layout';
import GitHubRedirectLink from 'components/common/links/GitHubRedirectLink';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrg, getRepos, getSpecificRepo } from 'store/actions';

export default function RepoDetails() {
  const { router, org, repoDetails } = useSelector((state) => state);

  const dispatch = useDispatch();

  var repoName = router.location.pathname.split('/').pop();

  useEffect(() => {
    if (repoDetails.items.length === 0) {
      dispatch(getRepos());
      dispatch(getOrg());
      dispatch(getSpecificRepo(repoName));
    }
  }, [dispatch, repoDetails.items, repoName]);

  return (
    <Layout layout='details'>
      <main className='details-container'>
        {repoDetails.items.length > 0 && !repoDetails.isFetching ? (
          <>
            <div className='m-5 rounded-lg border-2 border-gray-300 bg-white p-5 shadow-md shadow-slate-600'>
              <GitHubRedirectLink
                url={repoDetails.items[0].owner.html_url}
                text={repoDetails.items[0].owner.login}
              />
              <span className='mx-1 text-xl'>/</span>
              <GitHubRedirectLink
                url={repoDetails.items[0].html_url}
                text={repoDetails.items[0].name}
              />
              <div className='py-2 text-xl'>{`${repoDetails.items[0].description}`}</div>
              <div className='w-100 flex flex-row justify-around'>
                <RepoHoverBtn
                  url={repoDetails.items[0].html_url}
                  type_count={repoDetails.items[0].stargazers_count}
                  type='stars'
                  text='Stars'
                />
                <RepoHoverBtn
                  url={repoDetails.items[0].html_url}
                  type_count={repoDetails.items[0].forks_count}
                  type='forks'
                  text='Forks'
                />
                <RepoHoverBtn
                  url={repoDetails.items[0].html_url}
                  type_count={repoDetails.items[0].watchers_count}
                  type='watchers'
                  text='Watchers'
                />
                <RepoHoverBtn
                  url={repoDetails.items[0].html_url}
                  type_count={repoDetails.items[0].language}
                  type='language'
                  text='language'
                />
              </div>
            </div>
          </>
        ) : (
          <ErrorBox
            errorTitle={'Unable to retrieve repo details'}
            errorMessage={'Redux cache is empty'}
            suggestion={'Return to the home page and try again'}
          />
        )}
      </main>
    </Layout>
  );
}
