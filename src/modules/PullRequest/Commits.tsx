import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../shared/store'
import { fetchGitHubPullRequestCommits } from '../shared/store/queries/commits'
import LoadingScreen from '../shared/components/Loading'
import NoData from '../shared/components/NoData'
import Avatar from '../shared/components/Avatar/Avatar'
import './Commits.scss'
import { PATH } from '../auth/routes/paths'
const Commits = ({ currentPullRequestRef }: { currentPullRequestRef: number }) => {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
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
    return <LoadingScreen blur size="s" />
  }

  if (!commits || commits.length === 0) {
    return <NoData title="No commits found" />
  }
  const handleClick = (commitId: string) =>
    navigate(PATH.COMMIT.replace(':id', id!).replace(':commitId', commitId))

  return (
    <ul className="commits-list">
      <div className="transparent-box">
        <p className="title">commits list:</p>
        {commits?.map((commit: any) => (
          <li className="name-avatar" key={commit?.sha} onClick={() => handleClick(commit.sha)}>
            <Avatar
              pic_url={commit.committer.avatar_url!}
              bordered
              includeToolTip={{ color: 'gold', title: commit.author.login }}
            />
            <p>{commit.commit.message}</p>
          </li>
        ))}
      </div>
    </ul>
  )
}

export default Commits
