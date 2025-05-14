import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProfileInfo from '../components/ProfileInfo';
import RepoList from '../components/RepoList';

const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [totalRepos, setTotalRepos] = useState<number>(0);
    const navigate = useNavigate();
    
  return (
    <div className="App min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 transition-colors duration-200">
      <div className='flex justify-center'>
        <Header />
      </div>
      <main className='w-full px-4 py-6'>
      <button 
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-400 text-gray-800 dark:text-gray-600 rounded-md hover:bg-gray-300"
      >
        ← Back to Search
      </button>
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileInfo username={username} setTotalRepos={setTotalRepos}/>
          <RepoList username={username} totalRepos={totalRepos}/>
        </div>
      </main>
    </div>
  )
}

export default Profile