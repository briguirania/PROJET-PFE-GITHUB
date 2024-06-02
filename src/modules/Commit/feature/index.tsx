import { fetchGitHubCommitChanges, fetchGitHubCommitFiles } from '@src/modules/shared/store/queries/commits'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../shared/store'
import LoadingScreen from '../../shared/components/Loading/index'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { useEffect, useState } from 'react'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import { PATH } from '@src/modules/auth/routes/paths'
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'
import { id } from 'date-fns/locale'
const CommitChanges = () => {
  const { id, commitId } = useParams()
  const { user } = useAppSelector((state) => state.auth)

  const { data: filesData , isLoading: LoadingFiles } = useQuery({
    queryFn: () =>
      fetchGitHubCommitFiles({ repo: id!, user: user?.user_metadata?.user_name, ref: commitId! }),
    queryKey: ['commitFiles', id, commitId],
    cacheTime: 1,
    enabled: true,
  })
  console.log({filesData})
  const { data: fileChanges, isLoading } = useQuery({
    queryFn: () =>
      fetchGitHubCommitChanges({ repo: id!, user: user?.user_metadata?.user_name, ref: commitId! }),
    queryKey: ['oneFileChanges', {}],
    cacheTime: 1,
    enabled: true,
  })
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedFileContent, setSelectedFileContent] = useState<string> ("")

  useEffect(()=>{

    function extractDiffContent(diffString: string, fileName: string){
      const fileStartIndex = diffString?.indexOf('diff --git a/${fileName} b/${fileName}')
      const stringLength = 'diff --git a/${fileName} b/${fileName}'?.length
      const fileEndIndex = diffString
        ?.slice(fileStartIndex + stringLength +1)
        ?.indexOf('diff --git')
        const fileContent = diffString.slice(fileStartIndex, fileEndIndex)
        setSelectedFileContent(fileContent)
    }
    fileChanges && extractDiffContent(fileChanges,selectedFile!)
  },[selectedFile, fileChanges]
)
  
  if (isLoading) {
    return <LoadingScreen blur size="s" />
  }
  const diffHtml = Diff2Html.html(selectedFileContent!, {
    inputFormat: 'diff',
    highlight: true,
    colorScheme: 'dark',
    outputFormat: 'line-by-line',
    drawFileList: true,
    DiffStyleType: 'char',
})

  return (
    <MainLayout>
    <MainContainer
      linkProps={{
        links: [
          { name: 'repositories', href: PATH.REPO },
          { name: 'pull requests', href: PATH.PULL.replace(':id', id!) },
          { name: 'commit', href: '' },
        ],
        title: `Commit ${commitId}`,
      }}
    >
      <div className="code-diff__wrapper" style={{ display: 'flex' }}>
        <div className="files-list" style={{ width: '20%', borderRight: '1px solid #ccc', padding: '10px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filesData?.map((file: { filename: string }) => (
              <li key={file.filename} onClick={() => setSelectedFile(file.filename)} style={{ cursor: 'pointer' }}>
                {file.filename}
              </li>
            ))}
          </ul>
        </div>
        <div className="code-diff"  dangerouslySetInnerHTML={{ __html: diffHtml }} />
      </div>
    </MainContainer>
  </MainLayout>
      
  )
}

export default CommitChanges;


function extractDiffContent(diffData: any, selectedFile: string): string | import("diff2html/lib/types").DiffFile[] {
  throw new Error('Function not implemented.')
}

