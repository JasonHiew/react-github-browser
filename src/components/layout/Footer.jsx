const Footer = () => {
  const date = new Date();

  return (
    <footer className='footer'>
      <p className='mr-2'>&copy; {date.getFullYear().toString()} by </p>
      <a
        className='footer-link'
        href='https://jason-devs.me'
        target='_blank'
        rel='noopener noreferrer'
      >
        {' '}
        Jason Hiew
      </a>
    </footer>
  );
};

export default Footer;
