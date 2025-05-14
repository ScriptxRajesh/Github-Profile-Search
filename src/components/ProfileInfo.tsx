import React,  {useState, useEffect} from 'react';
import axios from 'axios';
import { Profile } from '../types/github';

interface props {
    username: string | undefined;
    setTotalRepos: (value: number) => void;
};

const ProfileInfo: React.FC<props> = ({username, setTotalRepos}) => {

  const [userProfile, setUserProfile] = useState<Profile>();

  const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
      if(!username) return;
      const fetchUserProfile = async () => {
        try {
          const res = await axios.get(`https:api.github.com/users/${username}`);
          // console.log(res);
          setUserProfile(res.data);
          // console.log(userProfile);
        } catch (err) {
          if(err instanceof Error){
            setError(err.message);
          }else{
            setError(`An error occurred while fetching user: ${username} profile!`);
          }
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    },[username])

    useEffect(()=>{
      setTotalRepos(userProfile?.public_repos ?? 0);
    }, [userProfile?.public_repos]);

    if(!userProfile) return null;
  return (
    <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <div className="flex flex-col items-center mb-6">
            <img 
              src={userProfile.avatar_url} 
              alt={`${userProfile.login}'s avatar`} 
              className="w-32 h-32 rounded-full mb-4 border-gray-200 border-4"
            />
            <h1 className="text-2xl font-bold">{userProfile.name || userProfile.login}</h1>
            <a 
              href={userProfile.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-1"
            >
              @{userProfile.login}
            </a>
          </div>
          
          <div className="space-y-4">
            {userProfile.bio && (
              <div>
                <h2 className="text-lg font-semibold mb-1 dark:text-gray-200">Bio</h2>
                <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-3 rounded-md dark:bg-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                <p className="text-lg font-medium dark:text-white">{userProfile.followers}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md dark:bg-gray-700 ">
                <p className="text-sm text-gray-500 dark:text-gray-400">Following</p>
                <p className="text-lg font-medium dark:text-white">{userProfile.following}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md dark:bg-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Repos</p>
                <p className="text-lg font-medium dark:text-white">{userProfile.public_repos}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {userProfile.location && (
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2 dark:text-gray-400">📍</span>
                  <span>{userProfile.location}</span>
                </div>
              )}
              
              {userProfile.email && (
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2 dark:text-gray-400">✉️</span>
                  <a href={`mailto:${userProfile.email}`} className="text-blue-600 hover:underline">
                    {userProfile.email}
                  </a>
                </div>
              )}
              
              {userProfile.blog && (
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2 dark:text-gray-400">🔗</span>
                  <a href={userProfile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                    {userProfile.blog}
                  </a>
                </div>
              )}
            </div>
    </div>
    </div>
  )
}

export default ProfileInfo