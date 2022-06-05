const GitHubRedirectLink = (props) => {
  return (
    <a
      className=' text-3xl font-bold text-indigo-600 hover:underline'
      href={props.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      {props.text}
    </a>
  );
};

export default GitHubRedirectLink;
