import Breadcrumb from '@/app/components/Breadcrumb';

export default function Contact() {
  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'ติดต่อเรา', href: '/contact' },
  ];

  return (
    <main className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mt-4">ติดต่อเรา</h1>
      {/* เนื้อหาหน้าติดต่อเรา */}
    </main>
  );
}