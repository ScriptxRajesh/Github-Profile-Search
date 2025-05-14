import React, { useEffect } from 'react'

interface Props {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({search, setSearch, onSearch}) => {

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      onSearch();
    }
  }
  // useEffect(()=>{
  //   onSearch();
  // },[]);
  return (
    <div className='flex items-center mb-4'>
      <input
        type="text"
        value={search}
        placeholder='Search Github users...'
        className='flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
        onKeyDown={handleKeyPress}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={onSearch}
        className='bg-blue-800 text-white px-4 py-2 hover:bg-blue-900 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-700 dark:hover:bg-blue-1000'
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar