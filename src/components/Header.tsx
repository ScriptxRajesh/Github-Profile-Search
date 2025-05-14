import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const Header: React.FC = () => {
    const [isDark, setIsDark] = useState(() =>{
        if(typeof window !== "undefined"){
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
      const root = window.document.documentElement;
      if(isDark){
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, [isDark])
    

    
    return (
      <header className="w-full lg:w-1/2 rounded-l-md bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">GitHub User Search</Link>
          <button 
            onClick={() => setIsDark(prev => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
          </button>
        </div>
      </header>
    )
}

export default Header