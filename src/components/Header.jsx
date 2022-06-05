import { ArrowLeftIcon } from '@primer/octicons-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import 'styles/styles.css';

const Header = ({ hidden }) => {
  const { org } = useSelector((state) => state);

  return (
    <header className='header'>
      {org.items.length > 0 && !hidden ? (
        <nav className='navbar'>
          <div className='navbar-brand'>
            <Link to='/' className='navbar-brand-link'>
              <ArrowLeftIcon size={24} verticalAlign='middle' className='m-2' />
              <img
                className='navbar-img'
                src={org.items.length > 0 ? org.items[0].avatar_url : ''}
                alt={org.items.length > 0 ? org.items[0].name : ''}
              />
            </Link>
            <h3 className='navbar-title'>{org.items[0].name}</h3>
          </div>
        </nav>
      ) : org.items.length === 0 ? (
        <div className='h-14'></div>
      ) : null}
    </header>
  );
};

export default Header;
