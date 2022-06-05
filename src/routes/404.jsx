import { MoonIcon, RocketIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

export default function RepoDetails() {
  return (
    <div className='gradient'>
      <main className='relative h-screen p-2'>
        <div className='mx-auto my-20 flex h-3/4 w-5/6 flex-col justify-center rounded-lg border-2 border-gray-300 bg-white p-5 py-20 align-middle shadow-md shadow-slate-600 md:w-3/4'>
          <h2 className='text-center text-5xl font-bold'>404:</h2>
          <h2 className='text-center text-4xl font-semibold'>
            <RocketIcon size={50} className='mr-5 text-neutral-700' />
            Page Not Found...
            <MoonIcon size={50} className='ml-5 text-yellow-400' />
          </h2>
          <Link
            className='mx-auto justify-center p-8 text-center text-3xl font-bold text-indigo-600 hover:underline'
            to='/'
          >
            Back to Home
          </Link>{' '}
        </div>
      </main>
    </div>
  );
}
