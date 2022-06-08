import { useDispatch, useSelector } from 'react-redux';
import ErrorBox from 'components/common/boxes/ErrorBox';
import RepoHoverBtn from 'components/common/links/RepoHoverBtn';
import Layout from 'components/layout/Layout';
import GitHubRedirectLink from 'components/common/links/GitHubRedirectLink';
import { useEffect } from 'react';
import { getOrg, getRepos, getSpecificRepo } from 'store/actions';

export default function RepoDetails() {
  const { router, repoDetails } = useSelector((state) => state);

  const dispatch = useDispatch();

  var repoName = router.location.pathname.split('/').pop();

  useEffect(() => {
    if (repoDetails.items.length === 0) {
      // dispatch(getRepos());
      dispatch(getOrg());
      dispatch(getSpecificRepo(repoName));
    }
  }, [dispatch, repoDetails.items, repoName]);

  return (
    <Layout layout='details'>
      <main className='repo-details-outer-container'>
        {repoDetails.items.length > 0 && !repoDetails.isFetching ? (
          <div className='repo-details-inner-container'>
            <GitHubRedirectLink
              url={repoDetails.items[0].owner.html_url}
              text={repoDetails.items[0].owner.login}
            />
            <span className='mx-1 text-xl'>/</span>
            <GitHubRedirectLink
              url={repoDetails.items[0].html_url}
              text={repoDetails.items[0].name}
            />
            <div className='repo-details-description'>{`${repoDetails.items[0].description}`}</div>
            <div className='repo-details-btn-grid'>
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
