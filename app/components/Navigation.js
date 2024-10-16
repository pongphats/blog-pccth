import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import NotificationButton from './NotificationButton';


const navLinks = [
  { href: '/', label: 'หน้าหลัก' },
  { href: '/users', label: 'รายชื่อผู้ใช้' },
  { href: '/comment', label: 'แสดงความคิดเห็น' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/blogs', label: 'บล็อก' },
  { href: '/news', label: 'ข่าวสาร' },
];

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-gray-300" aria-label={link.label}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <NotificationButton aria-label="แจ้งเตือน" />
          <ThemeToggle aria-label="เปลี่ยนธีม" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;