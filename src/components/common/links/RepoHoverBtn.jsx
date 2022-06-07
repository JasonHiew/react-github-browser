import {
  BookIcon,
  EyeIcon,
  RepoForkedIcon,
  StarIcon,
} from '@primer/octicons-react';

const RepoHoverBtn = (props) => {
  return (
    <a
      className='github-repo-hover-link'
      href={props.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='github-repo-hover-contents' title={props.text}>
        {props.type === 'stars' && (
          <StarIcon size={24} verticalAlign='middle' />
        )}
        {props.type === 'forks' && (
          <RepoForkedIcon size={24} verticalAlign='middle' />
        )}
        {props.type === 'watchers' && (
          <EyeIcon size={24} verticalAlign='middle' />
        )}
        {props.type === 'language' && (
          <BookIcon size={24} verticalAlign='middle' />
        )}
        <span className='align-middle'>
          {props.type_count} {props.text}
        </span>
      </div>
    </a>
  );
};
export default RepoHoverBtn;
