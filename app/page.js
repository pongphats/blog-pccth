"use client";

import { useState } from "react";
import { Lock, UsersRound, LockKeyhole, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setTokenCookie } from "@/actions/auth";

// import { setAuthToken } from '@/app/utils/cookie';
export default function Login() {
  // const [email, setEmail] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("เข้าสู่ระบบด้วย:", username, password);
    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_HOST}/api/app/token`
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      
      localStorage.setItem("token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);

      await setTokenCookie(data.data.access_token, data.data.refresh_token);
      router.push("/home");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลงทะเบียน:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 dark:bg-green-600 rounded-full p-3">
              <Lock className="text-white" size={24} />
            </div>
          </div>
          <h2 className="text-2xl mb-6 text-center font-bold text-green-800 dark:text-green-300">
            เข้าสู่ระบบ
          </h2>
          <div className="mb-4 relative">
            <label
              className="block text-green-700 dark:text-green-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              อีเมล
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-green-700 dark:text-green-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 dark:focus:border-green-400"
                id="email"
                placeholder="อีเมลของคุณ"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UsersRound className="h-5 w-5 text-green-400 dark:text-green-300" />
              </div>
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-green-700 dark:text-green-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              รหัสผ่าน
            </label>
            <div className="relative mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-green-700 dark:text-green-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 dark:focus:border-green-400"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่านของคุณ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="h-5 w-5 text-green-400 dark:text-green-300" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-green-400 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <button
              className="w-full bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              เข้าสู่ระบบ
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ยังไม่มีบัญชี?
            </span>
            <Link
              href="/register"
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 ml-1"
            >
              ลงทะเบียน
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
