import { message } from 'antd'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endpoints.routes'
import { getTokens } from '@src/modules/auth/utils/token'

export async function fetchGitHubPullRequestCommits(props: {
  repo: string
  user: string
  ref: string
}) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getPullRequestsCommits
        .replace(':user', user)
        .replace(':repo', repo)
        .replace(':ref', ref)
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch pull request commits')
  }
}
export async function fetchGitHubCommitChanges(props: { repo: string; user: string; ref: string }) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getOneCommitChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':commitSHA', ref),
      {
        headers: { Accept: 'application/vnd.github.v3.diff; charset=utf-8' },
      }
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch pull request commits')
  }
}
export async function fetchGitHubCommitFiles(props: {
  repo: string
  user: string
  ref: string
}) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getOneCommitChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':commitSHA', ref),
      
    )
    return response.data
  } catch (error) {
    message.error('Failed to fetch pull request commits')
  }
}


