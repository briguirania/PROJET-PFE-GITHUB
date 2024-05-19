import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../shared/store';
import { fetchGitHubRepositoryPullsRequests } from '../shared/store/queries/pull/index';
import LoadingScreen from '../shared/components/Loading';
import * as dayjs from 'dayjs';


const OnePullRequest = ({ pullRequest }: { pullRequest: any }) => {
  

  
  return (
    <div className="one-pull-request">
      <h4>{pullRequest?.title} - #{pullRequest?.number}</h4>
      <p>Created at: {dayjs(pullRequest?.created_at).format('DD/MM/YYYY HH:MM')}</p>
      <p>Created by: {pullRequest?.user?.login}</p>
      <p>Status: {pullRequest?.locked ? 'Locked' : 'Open'}</p>
      <p>updated at: {dayjs(pullRequest?.updated_at).format('DD/MM/YYYY HH:MM')}</p>
      
    </div>
  );
};

export default OnePullRequest;

