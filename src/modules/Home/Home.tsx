import { useQuery } from 'react-query'
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew'
import NoData from '../shared/components/NoData'
import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { fetchGitHubRepositories } from '../shared/store/queries/repo/repo'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../auth/routes/paths'

export default function Home() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryFn: () => fetchGitHubRepositories(),
    queryKey: ['repo', {}],
    cacheTime: 1, // Cache data to reuse without component re-render
    enabled: true, // Redisplace true with a condition for execution control
  })
  if (isLoading) {
    return <div className="loading">Loading...</div>
  }
  if (!data || data.length === 0) {
    return <NoData title={'No Projects'}></NoData>
  }

  return (
    <MainLayout>
      <MainContainer
        linkProps={{ title: 'Repositories', links: [{ name: 'repositories', href: PATH.REPO }] }}
      >
        <div className="home-container">
          <div className="card-container">
            {data?.map((repo: { id: string; name: string }, i: number) => (
              <CardSkew key={repo.id} autoColors={i + 1}>
                <div onClick={() => navigate(PATH.PULL.replace(':id', repo.name!))}>
                  <p>{repo.name}</p>
                </div>
              </CardSkew>
            ))}
          </div>
        </div>
      </MainContainer>
    </MainLayout>
  )
}
