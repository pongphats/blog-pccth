'use client'

import { useEffect } from 'react';

const ThemeInitializer = () => {
  useEffect(() => {
    const darkMode = document.cookie.includes('darkMode=true');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // เพิ่ม class เพื่อเปิดใช้งาน transition หลังจาก initial render
    document.body.classList.add('theme-transition');
  }, []);

  return null;
};

export default ThemeInitializer;