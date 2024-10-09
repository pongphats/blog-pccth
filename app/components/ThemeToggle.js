'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Moon, Sun} from 'lucide-react'
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const darkMode = document.cookie.includes('darkMode=true');
    setIsDarkMode(darkMode);
    applyTheme(darkMode);
  }, []);

  const applyTheme = (darkMode) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.cookie = `darkMode=${newDarkMode}; path=/; max-age=31536000`; // 1 year
    applyTheme(newDarkMode);
    router.refresh();
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-white hover:text-gray-300"
    >
      {isDarkMode ? (<Sun/>) : (<Moon/>)}
    </button>
  );
};

export default ThemeToggle;