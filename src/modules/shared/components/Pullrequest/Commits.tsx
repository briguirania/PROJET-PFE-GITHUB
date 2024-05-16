
interface CommitsProps {
  commits: any[];
}

const CommitsComponent: React.FC<CommitsProps> = ({ commits }) => {
  return (
    <ul className="commits-list">
      {commits?.map(commit => (
        <li key={commit.id}>
          <p>{commit.message}</p>
          {}
        </li>
      ))}
    </ul>
  );
};

export default CommitsComponent;

