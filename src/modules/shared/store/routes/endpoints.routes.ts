export const endpoints = {
  auth: {},
  getRepositories: 'user/repos',
  getPullRequests: `repos/:user/:repo/pulls`,
  getPullRequestsCommits: `repos/:user/:repo/pulls/:ref/commits`,
  getOneCommits: `repos/:user/:repo/commits/:ref`,
  getOneFileContent: `repos/:user/:repo/contents/:path?ref=:ref`,
  getOneCommitChanges: `/repos/:owner/:repo/commits/:commitSHA`,
}
