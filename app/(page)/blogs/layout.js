import Breadcrumb from '../../components/Breadcrumb';

export default function Layout({ children, breadcrumbItems }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-3">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="">{children}</div>
    </div>
  );
}
