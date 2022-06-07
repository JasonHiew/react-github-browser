import { Link } from 'react-router-dom';

import 'styles/styles.css';

const ErrorBox = ({ errorTitle, errorMessage, suggestion }) => {
  return (
    <div className='error-box-outer-container'>
      <div className='error-box-inner-container'>
        <h2 className='error-box-title'>Error: {errorTitle}</h2>
        <h3 className='error-box-description'>{errorMessage}</h3>
        <h4 className='error-box-suggestion'>{suggestion}</h4>
        <Link className='error-page-link' to='/'>
          Back to Home
        </Link>{' '}
      </div>
    </div>
  );
};

export default ErrorBox;
