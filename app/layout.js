import { Inter } from "next/font/google";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

import Notifications from "./components/Notifications";
import { cookies } from "next/headers";
import ThemeInitializer from "./components/ThemeInitializer";
import { NextUIProvider } from "@nextui-org/react";
import TokenManager from "./components/TokenManager";

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weights: ["100", "400", "700"],
});

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("darkMode");
  const isDarkMode = darkMode ? darkMode.value === "true" : false;

  return (
    <html lang="th" className={isDarkMode ? "dark" : ""}>
      <body className={notoSansThai.className}>
        <TokenManager />
        <ThemeInitializer />
        <NextUIProvider>
          <main>{children}</main>
        </NextUIProvider>
        <Notifications />
      </body>
    </html>
  );
}
