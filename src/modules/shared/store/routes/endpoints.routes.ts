export const endpoints = {
  auth: {},
  getRepositories: 'user/repos',
  getPullRequests: `repos/:user/:repo/pulls`,
  getPullRequestsCommits: `repos/:user/:repo/pulls/:ref/commits`,
}
