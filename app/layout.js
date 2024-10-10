import { Inter } from "next/font/google";
<<<<<<< HEAD
import { Noto_Sans_Thai } from "next/font/google";
=======
import { Noto_Sans_Thai } from 'next/font/google';
>>>>>>> dev
import "./globals.css";
import Navigation from "./components/Navigation";
import Notifications from "./components/Notifications";
import { cookies } from "next/headers";
import ThemeInitializer from "./components/ThemeInitializer";

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({
<<<<<<< HEAD
  subsets: ["thai"],
  weights: ["100", "400", "700"],
=======
  subsets: ['thai'],
  weights: ['100', '400', '700'],
>>>>>>> dev
});

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("darkMode");
  const isDarkMode = darkMode ? darkMode.value === "true" : false;

  return (
    <html lang="th" className={isDarkMode ? 'dark' : ''}>
      <body className={notoSansThai.className}>
        <ThemeInitializer />
        <Navigation />
        <main>{children}</main>
        <Notifications />
      </body>
    </html>
  );
}
