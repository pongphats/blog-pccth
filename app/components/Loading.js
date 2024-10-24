export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <h2 className="text-xl font-semibold mt-4 text-gray-700">
          กำลังโหลด...
        </h2>
        <p className="text-gray-500 mt-2">โปรดรอสักครู่</p>
      </div>
    </div>
  );
}
