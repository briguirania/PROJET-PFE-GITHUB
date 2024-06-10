import { PATH } from '@src/modules/auth/routes/paths'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import { useAppSelector } from '@src/modules/shared/store'
import { Collapse } from 'antd'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { fetchGitHubRepositoryPullsRequests } from '../shared/store/queries/pull'
import Commits from './Commits'
import OnePullRequest from './OnePullRequest'
import './_index.scss'
export interface IPullRequest {
  id: string
  title: string
  created_at: Day
  updated_at: Day
  locked: boolean
  number: number
  user: {
    login: string
    avatar_url: string
  }
  base: {
    ref: string
    sha: string
  }
  head: {
    ref: string
    sha: string
  }
  merge_commit_sha: string
}
export default function PullRequests() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)

  const { data: pullRequests, isLoading: isPullRequestsLoading } = useQuery({
    queryFn: () =>
      fetchGitHubRepositoryPullsRequests({ repo: id!, user: user?.user_metadata?.user_name }),
    queryKey: ['pullRequests', {}],
    staleTime: Infinity,
    cacheTime: 1,
    enabled: !!user,
  })

  return (
    <MainLayout>
      <MainContainer
        linkProps={{
          links: [
            { name: 'repositories', href: PATH.REPO },
            { name: 'pull requests', href: '' },
          ],
          title: id!,
        }}
        style={{ paddingBottom: 0 }}
      >
        {isPullRequestsLoading ? (
          <LoadingScreen blur />
        ) : (
          <div className="pull-requests__container">
            {pullRequests?.length === 0 ? (
              <NoData title={`no pull requests in ${id!} `} />
            ) : (
              <div className="pull-request">
                <Collapse
                  items={pullRequests?.map((pull: IPullRequest) => ({
                    key: `${pull.number}`,
                    label: <OnePullRequest pullRequest={pull} />,
                    children: <Commits currentPullRequestRef={pull?.number} />,
                  }))}
                />
              </div>
            )}
          </div>
        )}
      </MainContainer>
    </MainLayout>
  )
}
