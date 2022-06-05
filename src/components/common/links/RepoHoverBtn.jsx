import {
  BookIcon,
  EyeIcon,
  RepoForkedIcon,
  StarIcon,
} from '@primer/octicons-react';

const RepoHoverBtn = (props) => {
  return (
    <a
      className='m-0 h-16 rounded-lg border-2 border-transparent border-gray-300 hover:border-2 hover:border-indigo-400 hover:bg-gray-200 hover:text-indigo-600 md:m-2'
      href={props.url}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div
        className='flex basis-1/4 flex-col items-center justify-center p-2 text-center'
        title={props.text}
      >
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
