import React, { useState, useEffect } from 'react';
import { Repository } from '../types/github';
import axios from 'axios';

const REPOS_PER_PAGE = 5;

interface Props {
  username: string | undefined;
  totalRepos: number;
}

const RepoList: React.FC<Props> = ({ username,totalRepos}) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchRepos = async (page = 1) => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${page}`
      );
      setRepos(res.data);
      setHasNextPage(res.data.length === REPOS_PER_PAGE);
    } catch (err) {
      if(axios.isAxiosError(err)){
        setError(err?.response?.data?.message || `An error occurred while fetching repositories of ${username}`);
      } else {
        setError(`An error occurred while fetching repositories of ${username}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!username) return;
    setPage(1); // reset to page 1 on username change
  }, [username]);

  useEffect(() => {
    fetchRepos(page);
  }, [username, page]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {!error && (<>
            Repositories {totalRepos > 0 && (
                          <span>
                            ({(page - 1) * REPOS_PER_PAGE + 1} - {Math.min(page * REPOS_PER_PAGE, totalRepos)})
                          </span>
                        )}
          </>)}
        </h2>

        {loading && (
          <div className='flex justify-center my-6'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        )}
        {error && (
          <div className='p-3 bg-red-100 text-red-700 rounded-md mb-4 dark:bg-red-900 dark:text-red-200'>
            {error}
          </div>
        )}

        {!loading && repos.length === 0 && !error ? (
          <p className="text-gray-500 dark:text-gray-400">This user has no public repositories.</p>
        ) : (
          <div className="space-y-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>

                {repo.description && (
                  <p className="text-gray-600 mt-2 dark:text-gray-300">{repo.description}</p>
                )}

                <div className="flex flex-wrap items-center mt-3 text-sm">
                  {repo.language && (
                    <span className="flex items-center mr-4 mb-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-1 dark:text-gray-300"></span>
                      {repo.language}
                    </span>
                  )}

                  <span className="flex items-center mr-4 mb-2">
                    <span className="mr-1">⭐</span>
                    <span className='text-gray-700 dark:text-gray-300'>{repo.stargazers_count}</span>
                  </span>

                  <span className="flex items-center mr-4 mb-2">
                    <span className="mr-1">🍴</span>
                    <span className='text-gray-700 dark:text-gray-300'>{repo.forks_count}</span>
                  </span>

                  <span className="flex items-center mb-2 text-gray-500 dark:text-gray-400">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && totalRepos>0 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${
                page === 1
                  ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded-md ${
                !hasNextPage
                  ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoList;
