const GitHubRedirectLink = (props) => {
  return (
    <a
      className='github-redirect-link'
      href={props.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      {props.text}
    </a>
  );
};

export default GitHubRedirectLink;
