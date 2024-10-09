import Breadcrumb from '../components/Breadcrumb';

export default function Services() {
  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บริการ', href: '/services' },
  ];

  return (
    <main className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mt-4">บริการของเรา</h1>
      {/* เนื้อหาหน้าบริการ */}
    </main>
  );
}