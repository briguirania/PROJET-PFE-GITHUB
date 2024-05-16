import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../shared/store'
import { fetchGitHubPullRequestCommits } from '../shared/store/queries/commits'

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
  console.log(commits, 'data')
  return <div>Commits</div>
}

export default Commits
