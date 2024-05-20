
import * as dayjs from 'dayjs';
import './OnePullRequest.scss';

const OnePullRequest = ({ pullRequest }: { pullRequest: any }) => {
  

  
  return (
    <div className="one-pull-request">
      <div className='title-create'>
        <h4 className='title-pull'>{pullRequest?.title} - #{pullRequest?.number}</h4>
        <p className='creation-date'>Created at: {dayjs(pullRequest?.created_at).format('DD/MM/YYYY HH:MM')}</p>
      </div>
      <div className='left-side'>
      <div className='name-status'>
       <p className='user-name'>Created by: {pullRequest?.user?.login}</p>
       <p className='status'>Status: {pullRequest?.locked ? 'Locked' : 'Open'}</p>
      </div>
        <p className='update-date'>updated at: {dayjs(pullRequest?.updated_at).format('DD/MM/YYYY HH:MM')}</p>
      </div>
    </div>
  );
};

export default OnePullRequest;

