
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from './components/Navigation';
import Notifications from './components/Notifications';
import { cookies } from 'next/headers';
import ThemeInitializer from './components/ThemeInitializer';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const darkMode = cookieStore.get('darkMode');
  const isDarkMode = darkMode ? darkMode.value === 'true' : false;

  return (
    <html lang="th" className={isDarkMode ? 'dark' : ''}>
      <body className={inter.className}>
        <ThemeInitializer />
        <Navigation />
        <main>{children}</main>
        <Notifications />
      </body>
    </html>
  );
}

