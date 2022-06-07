import { MoonIcon, RocketIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

export default function RepoDetails() {
  return (
    <div className='gradient'>
      <main className='error-page-outer-container'>
        <div className='error-page-inner-container'>
          <h2 className='error-page-title'>404:</h2>
          <h2 className='error-page-description'>
            <RocketIcon size={50} className='mr-5 text-neutral-700' />
            Page Not Found...
            <MoonIcon size={50} className='ml-5 text-yellow-400' />
          </h2>
          <Link className='error-page-link' to='/'>
            Back to Home
          </Link>{' '}
        </div>
      </main>
    </div>
  );
}
