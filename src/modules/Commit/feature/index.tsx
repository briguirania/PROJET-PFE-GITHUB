import { fetchGitHubCommitChanges } from '@src/modules/shared/store/queries/commits'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../shared/store'
import LoadingScreen from '../../shared/components/Loading/index'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'

const CommitChanges = () => {
  const { id, commitId } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetchGitHubCommitChanges({ repo: id!, user: user?.user_metadata?.user_name, ref: commitId! }),
    queryKey: ['repo', {}],
    cacheTime: 1,
    enabled: true,
  })
  if (isLoading) {
    return <LoadingScreen blur size="s" />
  }
  const diffHtml = Diff2Html.html(data, {
    inputFormat: 'diff',
    highlight: true,
    colorScheme: 'dark',
    outputFormat: 'line-by-line',
    drawFileList: true,
    DiffStyleType: 'char',
  })
  return (
    <div className="code-diff__wrapper">
      <div className="code-diff" dangerouslySetInnerHTML={{ __html: diffHtml }} />
    </div>
  )
}

export default CommitChanges
