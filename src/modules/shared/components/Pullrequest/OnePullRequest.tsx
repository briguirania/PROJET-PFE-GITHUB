import CommitsComponent from "./Commits";



interface OnePullRequestProps {
  pullRequest: any;
}

const OnePullRequest: React.FC<OnePullRequestProps> = ({ pullRequest }) => {
  const { title, user, created_at, commits } = pullRequest;

  return (
    <div>
      <h3>{title}</h3>
      <p>Opened by: {user.login}</p>
      <p>Created at: {new Date(created_at).toLocaleString()}</p>
      <h4>Commits:</h4>
      
        <CommitsComponent  commits={commits} />
    
    </div>
  );
};

export default OnePullRequest;