'use client'

import BlogCard from '../components/BlogCard';

export default function BlogsPage() {

  const mock_blogs = [
    {
      id: 1,
      title: "หัวข้อที่หนึ่ง",
      description: "รายละเอียดของหัวข้อที่หนึ่ง",
      author: "อุรังอุตัง",
      dateToCreated: "09/10/2567",
      dataToUpdated: "09/10/2567"
    },
    {
      id: 2,
      title: "หัวข้อที่สอง",
      description: "รายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สอง",
      author: "อุรังอุตัง",
      dateToCreated: "09/10/2567",
      dataToUpdated: "09/10/2567"
    },
    {
      id: 3,
      title: "หัวข้อที่สาม",
      description: "รายละเอียดของหัวข้อที่สาม",
      author: "อุรังอุตัง",
      dateToCreated: "09/10/2567",
      dataToUpdated: "09/10/2567"
    },
    {
      id: 4,
      title: "หัวข้อที่สี่",
      description: "รายละเอียดของหัวข้อที่สี่",
      author: "อุรังอุตัง",
      dateToCreated: "09/10/2567",
      dataToUpdated: "09/10/2567"
    },
    {
      id: 5,
      title: "หัวข้อที่ห้า",
      description: "รายละเอียดของหัวข้อที่ห้า",
      author: "อุรังอุตัง",
      dateToCreated: "09/10/2567",
      dataToUpdated: "09/10/2567"
    },
    {
      id: 6,
      title: "หัวข้อที่หก",
      description: "รายละเอียดของหัวข้อที่หก",
      author: "อุรังอุตัง",
      dateToCreated: "09/10/2567",
      dataToUpdated: "09/10/2567"
    },
  ]


  return (
    <div>
      <h1 className="text-2xl font-bold p-2">BlogsPage</h1>
      {
        mock_blogs.map((blog) => (
          <BlogCard blog={blog} />
        ))
      }
    </div>
  )
}
