import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import Header from '../components/Header';
import { Repository, User } from '../types/github';
import axios, {AxiosError} from 'axios';

const USERS_PER_PAGE = 5;
const REPOS_PER_PAGE = 5;

function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const totalPages=  Math.ceil(users.length/USERS_PER_PAGE);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${search}&per_page=30`);
      // console.log(res);
      setUsers(res.data.items);
      // console.log(users);
      setUserPage(1);
    } catch (err) {
      if(axios.isAxiosError(err)){
        setError(err?.response?.data?.message || 'An error occurred while fetching Users!');
      }else{
        setError('An error occurred while fetching Users!')
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const paginatedUsers = users.slice((userPage-1)*USERS_PER_PAGE,userPage*USERS_PER_PAGE);
  return (
    <div className="App min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 transition-colors duration-200">
      <div className='flex justify-center'>
        <Header />
      </div>
      <main className='w-full px-4 py-6'>
        <div className='flex items-center justify-center gap-6'>
          <div className='w-full lg:w-1/2'>
            <div className='mb-6'>
              <SearchBar search={search} setSearch={setSearch} onSearch={fetchUsers} loading={loading}/>
              {error && (
                <div className='p-3 bg-red-100 text-red-700 rounded-md mb-4 dark:bg-red-900 dark:text-red-200'>
                  {error}
                </div>
              )}
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
                <h2 className='text-xl font-bold mb-4 text-gray-800 dark:text-white'>
                  {users.length>0 ? `Users (${users.length})`: `Users`}
                </h2>
                {loading && (
                  <div className='flex justify-center my-6'>
                    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
                  </div>
                )}
                {users.length ===0 && !loading && (
                  <p className='text-gray-500 dark:text-gray-400'>No users found. Try searching for a username.</p>
                )}
                {users && users.length>0 ? (
                  <>
                    <div className='space-y-4'>
                    {paginatedUsers.map((user)=>(
                      <UserCard key={user.login} user={user}/>
                    ))}
                  </div>
                  <div className='flex justify-between mt-4'>
                    <button 
                      disabled={userPage ===1} 
                      onClick={()=>setUserPage(prev =>prev-1)} 
                      className={`px-4 py-2 rounded-md ${
                        userPage === 1
                          ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-blue-900 text-white hover:bg-blue-800'
                      }`}
                      >
                        Prev
                      </button>
                    <button 
                      disabled={userPage ===totalPages} 
                      onClick={()=>setUserPage(prev =>prev+1)} 
                      className={`px-4 py-2 rounded-md ${
                        userPage === totalPages
                          ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-blue-900 text-white hover:bg-blue-800'
                      }`}
                      >
                        Next
                    </button>
                  </div>
                  </>
                ):(
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
