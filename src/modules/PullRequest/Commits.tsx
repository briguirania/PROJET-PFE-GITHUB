import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../shared/store'
import { fetchGitHubPullRequestCommits } from '../shared/store/queries/commits'
import LoadingScreen from '../shared/components/Loading'
import NoData from '../shared/components/NoData'
import Avatar from '../shared/components/Avatar/Avatar'

const Commits = ({ currentPullRequestRef }: { currentPullRequestRef: number }) => {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
 
  const { data: commits, isLoading: isCommitsLoading } = useQuery({
    queryFn: () =>
      fetchGitHubPullRequestCommits({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: `${currentPullRequestRef}`,
      }),
    queryKey: ['pullRequestsCommits', { currentPullRequestRef }],
    staleTime: Infinity,
    enabled: !!currentPullRequestRef,
    cacheTime: 0,
  })
  if (isCommitsLoading) {
    return <LoadingScreen blur size='s' />
  }

  if (!commits || commits.length === 0) {
    return <NoData title="No commits found" />
  }
  console.log(commits)
  return(
    <ul className="commits-list">
    {commits?.map((commit: any) => (
      <li key={commit?.sha}>
        <Avatar pic_url={commit.committer.avatar_url!} bordered includeToolTip={{color:'gold', title:commit.author.login}}/>
        <p>{commit.commit.message}</p>
        {}
      </li>
    ))}
  </ul>
);
}

export default Commits
