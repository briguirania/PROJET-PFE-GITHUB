import { useQuery } from 'react-query';
import { fetchGitHubRepositories , fetchGitHubDetails } from '../shared/store/queries/repo/repo';
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew';
import NoData from '../shared/components/NoData';

export default function Home() {
    const { data, isLoading } = useQuery({
        queryFn: () => fetchGitHubRepositories(),
        queryKey: ['repo', {}],
        cacheTime: 1, // Cache data to reuse without component re-render
        enabled:true, // Redisplace true with a condition for execution control
      });
      if (isLoading) {
        return <div className='loading'>Loading...</div>;
      }
      if (!data || data.length ===0){
        return <NoData title={'No Projects'}></NoData>
      }
      
  return (
    <div className='home-container'>
      <div className='card-container'>
      {data?.map((repo) =>(
        <CardSkew key={repo.id}>  
          <p>{repo.name}</p>
        </CardSkew>
      )
    )
  }
       </div>
    </div>
  );
}
