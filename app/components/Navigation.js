import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import NotificationButton from './NotificationButton';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              หน้าหลัก
            </Link>
          </li>
          <li>
            <Link href="/users" className="hover:text-gray-300">
              รายชื่อผู้ใช้
            </Link>
          </li>
          <li>
            <Link href="/comment" className="hover:text-gray-300">
              แสดงความคิดเห็น
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300">
              เกี่ยวกับเรา
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="hover:text-gray-300">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/news" className="hover:text-gray-300">
              ข่าวสาร
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <NotificationButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;