export default function SkeletonNews() {
  return (
    <li className="border rounded-lg shadow-md p-4 mb-4 relative animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="flex flex-row justify-between mt-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </li>
  );
}
