import React from 'react'
import { User } from '../types/github'
import { useNavigate } from 'react-router-dom';
interface Props {
  user: User;
  onSelect: () => void;
  selectedUser: string | null;
}

const UserCard: React.FC<Props> = ({user, onSelect, selectedUser}) => {
  const navigate = useNavigate();
  return (
    <div 
      key={user.id} 
      className={`border dark:border-gray-700 rounded-lg p-4 transition-colors duration-200 ${
        selectedUser === user.login 
          ? 'bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={user.avatar_url} 
            alt={`${user.login}'s avatar`}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">@{user.login}</h3>
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <button
          onClick={() => navigate(`/profile/${user.login}`)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          View
        </button>
      </div>
    </div>
  )
}

export default UserCard