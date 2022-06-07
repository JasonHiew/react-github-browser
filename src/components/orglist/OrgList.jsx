const OrgList = ({ org }) => {
  return org.items.length > 0 && !org.isFetching ? (
    <div className='org-list-container'>
      <div className='org-list-image-container'>
        <img
          className='org-list-image'
          src={org.items[0].avatar_url}
          alt={`${org.items[0].name}`}
        />
      </div>
      <div className='org-list-title-outer-container'>
        <div className='org-list-title-inner-container'>
          <span className='org-list-title'>{org.items[0].name} Repos</span>
        </div>
      </div>
    </div>
  ) : org.isFetching ? (
    <div className='org-list-container animate-pulse'>
      <div className='org-list-image-container'>
        <div className='org-list-image !bg-white'></div>
      </div>
      <div className='org-list-title-outer-container'>
        <div className='org-list-title-inner-container flex flex-col'>
          <div className='org-list-skeleton-title'></div>
          <div className='org-list-skeleton-title-long'></div>
          <div className='org-list-skeleton-title-long'></div>
        </div>
      </div>
    </div>
  ) : org.hasErrored ? (
    <p className='info-text'>Error...</p>
  ) : null;
};

export default OrgList;
