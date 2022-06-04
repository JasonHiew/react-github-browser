import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRepos } from '../store/actions';

export default function RepoDetails() {
  const { repoDetails } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className='gradient'>
      <main className='container mx-auto h-screen p-2 px-4 sm:w-3/4'>
        {repoDetails.items.length > 0 && !repoDetails.isFetching ? (
          <>
            <div className='m-5 rounded-lg border-2 border-gray-300 bg-white p-5 shadow-md shadow-slate-600'>
              <Link
                className='text-3xl font-bold text-indigo-600 hover:underline'
                to='/'
                onClick={() => dispatch(getRepos())}
              >{`${repoDetails.items[0].owner.login}`}</Link>{' '}
              /{' '}
              <a
                className='text-3xl font-bold text-indigo-600 hover:underline'
                href={repoDetails.items[0].html_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repoDetails.items[0].name}
              </a>
              <div className='p-2'>{`${repoDetails.items[0].description}`}</div>
              <div className='flex flex-row'>
                <div className='p-2'>{`⭐ ${repoDetails.items[0].stargazers_count}`}</div>
                <div className='p-2'>{`🍴 ${repoDetails.items[0].forks_count}`}</div>
                <div className='p-2'>{`👀 ${repoDetails.items[0].watchers_count}`}</div>
                <div className='p-2'>{`📚 ${repoDetails.items[0].language}`}</div>
              </div>
            </div>
          </>
        ) : (
          <div>No repo selected.</div>
        )}
      </main>
    </div>
  );
}
