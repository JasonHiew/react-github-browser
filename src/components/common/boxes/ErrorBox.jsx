import { Link } from 'react-router-dom';

import 'styles/styles.css';

const ErrorBox = ({ errorTitle, errorMessage, suggestion }) => {
  return (
    <div className='relative p-2'>
      <div className='error-inner-box'>
        <h2 className='text-center text-2xl font-bold'>Error: {errorTitle}</h2>
        <h3 className='text-center text-xl font-semibold'>{errorMessage}</h3>
        <h4 className='text-center text-xl font-semibold'>{suggestion}</h4>
        <Link
          className='mx-auto justify-center p-8 text-center text-3xl font-bold text-indigo-600 hover:underline'
          to='/'
        >
          Back to Home
        </Link>{' '}
      </div>
    </div>
  );
};

export default ErrorBox;
