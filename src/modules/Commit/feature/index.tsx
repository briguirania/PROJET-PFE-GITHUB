import StreamComponent from '@src/Sprint5/codeReview'
import { PATH } from '@src/modules/auth/routes/paths'
import ReviewButton from '@src/modules/shared/components/Buttons/Review'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'
import {
  fetchGitHubCommitChanges,
  fetchGitHubCommitFiles,
} from '@src/modules/shared/store/queries/commits'
import { Modal, Tooltip } from 'antd'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import emptyFile from '../../shared/assets/images/folder_empty.png'
import LoadingScreen from '../../shared/components/Loading/index'
import { useAppSelector } from '../../shared/store'

const CommitChanges = () => {
  const { id, commitId } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen]=useState(false)

  const { data: filesData, isLoading: LoadingFiles } = useQuery({
    queryFn: () =>
      fetchGitHubCommitFiles({ repo: id!, user: user?.user_metadata?.user_name, ref: commitId! }),
    queryKey: ['commitFiles', id, commitId],
    cacheTime: 1,
    enabled: !!user,
  })
  const { data: fileChanges, isLoading } = useQuery({
    queryFn: () =>
      fetchGitHubCommitChanges({ repo: id!, user: user?.user_metadata?.user_name, ref: commitId! }),
    queryKey: ['oneFileChanges', {}],
    cacheTime: 1,
    enabled: !!user,
  })
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [selectedFileContent, setSelectedFileContent] = useState<string>('')

  useEffect(() => {
    function extractDiffContent(diffString: string, fileName: string) {
      const fileStartIndex = diffString?.indexOf(`diff --git a/${fileName} b/${fileName}`)
      const stringLength = `diff --git a/${fileName} b/${fileName}`?.length
      const fileEndIndex = diffString
        ?.slice(fileStartIndex + stringLength + 1)
        ?.indexOf('diff --git')

      const fileContent = diffString.slice(fileStartIndex, fileEndIndex)
      setSelectedFileContent(fileContent)
    }

    fileChanges && extractDiffContent(fileChanges, selectedFile?.filename!)
  }, [selectedFile, fileChanges])

  if (isLoading) {
    return <LoadingScreen blur size="s" />
  }
  console.log({ selectedFileContent })
  const diffHtml = Diff2Html.html(selectedFileContent!, {
    inputFormat: 'diff',
    highlight: true,
    colorScheme: 'dark',
    outputFormat: 'line-by-line',
    drawFileList: true,
    DiffStyleType: 'char',
  })
console.log({selectedFile})
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
        <div className="one-commit-page">
          <div className="one-commit-page__files">
            <p className="one-commit-page__files__title">Files :</p>
            {filesData?.files?.map((file: any) => (
              <div
                className={`one-commit-page__files__one-file ${
                  selectedFile?.path === file.filename
                    ? 'one-commit-page__files__one-file--active'
                    : ''
                }`}
                key={file.filename}
                onClick={() => setSelectedFile(file)}
              >
                <p className="one-commit-page__files__one-file__name">{file.filename}</p>
                <div className="one-commit-page__files__one-file__stats">
                  <Tooltip title={'deletions'} color={'#ef233c'}>
                    <span className="one-commit-page__file-changes one-commit-page__file-changes--delete">
                      {`${file?.deletions}`.padStart(2, '0')}
                    </span>
                  </Tooltip>
                  <Tooltip title={'additions'} color={'#2dc653'}>
                    <span className="one-commit-page__file-changes one-commit-page__file-changes--addition">
                      {`${file?.additions}`.padStart(2, '0')}
                    </span>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>

          <div className="one-commit-page__content">
            <p className="one-commit-page__files__title">File Content :</p>
            <div className="one-commit-page__content__blanc">
              {selectedFileContent ? (
                <div className="code-diff__wrapper" style={{ display: 'flex' }}>
                  <div className="code-diff" dangerouslySetInnerHTML={{ __html: diffHtml }} />
                </div>
              ) : (
                <div className="one-commit-page__content__blanc__one-file">
                  <img className="one-commit-page__content__blanc__one-file__src" src={emptyFile} />
                  <p className="one-commit-page__content__blanc__one-file__message">
                    no file selected
                  </p>
                </div>
              )}
            </div>
          </div>
        <div className="code-diff"  dangerouslySetInnerHTML={{ __html: diffHtml }} />
        
          <Modal title={'Code Review'} className="editor__modal" open={isModalOpen} onCancel={()=>setIsModalOpen(false)}>
          <StreamComponent prompt={`const NotFound = () => {
  return <dis>Page Not Found!</div>
}

export default NotFound`}/>
        </Modal>
        <ReviewButton title='review changes' onClick={()=>setIsModalOpen(true)}/>
      </div>
    </MainContainer>
  </MainLayout>
      
  )
}

export default CommitChanges
