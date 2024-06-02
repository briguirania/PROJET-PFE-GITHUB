
import * as dayjs from 'dayjs';
import './OnePullRequest.scss';
import rejectedImage from '../shared/assets/images/rejected.png';
import verifieImage from '../shared/assets/images/verifie.png';
import Avatar from '../shared/components/Avatar/Avatar';
const OnePullRequest = ({ pullRequest }: { pullRequest: any }) => {
  return (
    <div className="one-pull-request">
      <div className='title-create'>
        <h4 className='title-pull'>{pullRequest?.title} - #{pullRequest?.number}</h4>
        <p className='creation-date'>Created at: {dayjs(pullRequest?.created_at).format('DD/MM/YYYY HH:MM')}</p>
      </div>
      <div className='left-side'>
        <div className='name-status'>
          <Avatar pic_url={pullRequest?.user.avatar_url} bordered includeToolTip={{color:'gold', title:pullRequest?.user?.login}}/>
          <p className='status'>Status: {pullRequest?.locked ? 'Locked' : 'Open'}</p>
          <img className='image-status' src={pullRequest?.locked ? rejectedImage : verifieImage} alt={pullRequest?.locked ? 'Locked' : 'Open'} />

        </div>
        <p className='update-date'>updated at: {dayjs(pullRequest?.updated_at).format('DD/MM/YYYY HH:MM')}</p>
      </div>
    </div>
  );
};

export default OnePullRequest;

