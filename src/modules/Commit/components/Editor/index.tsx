import ReviewButton from '@src/modules/shared/components/Buttons/Review'
import { Modal } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import emptyFileIcon from '../../../shared/assets/icons/svgs/no-data.svg'
import HilightCode from '../Hilights'
import StreamComponent from '../Stream'

interface IFile {
  file: {
    content: string
    name: string
    path: string
  }
  readyToUse?: string
  htmlContent?: string
  isModalOpen: boolean
  setModalState: Dispatch<SetStateAction<boolean>>
}
export default function Editor({
  file,
  readyToUse,
  htmlContent,
  isModalOpen,
  setModalState,
}: IFile) {
  return (
    <div className="editor">
      {file.content || htmlContent ? (
        <>
          {htmlContent ? (
            <div className="code-diff__wrapper">
              <div className="code-diff" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          ) : file.content ? (
            <HilightCode file={file} addLinesNumbers readyToUse={readyToUse} />
          ) : null}
        </>
      ) : (
        <div className="one-commit-page__content__blanc__one-file">
          <img className="one-commit-page__content__blanc__one-file__src" src={emptyFileIcon} />
          <p className="one-commit-page__content__blanc__one-file__message">empty file</p>
        </div>
      )}
      <Modal
        title={'Code Review'}
        open={isModalOpen}
        className="editor__modal"
        onCancel={() => setModalState(false)}
      >
        <StreamComponent code={atob(file?.content)} file={file} />
      </Modal>
    </div>
  )
}
