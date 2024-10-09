'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Breadcrumb from '../components/Breadcrumb';

const COMMENTS_PER_PAGE = 3;

export default function Comment() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'แสดงความคิดเห็น', href: '/comment' },
  ];

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/json/contact_data.json');
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleEditorChange = (content, editor) => {
    setContactData({ ...contactData, comment: content });
  };

  const addNotification = async (message) => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการส่งข้อมูล');
      }

      setSubmitMessage('ส่งข้อมูลติดต่อสำเร็จ');
      setContactData({ name: '', email: '', phone: '', comment: '' });
      fetchComments();
      addNotification(`เพิ่มความคิดเห็นใหม่จาก: ${contactData.name}`);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      setSubmitMessage('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const indexOfLastComment = currentPage * COMMENTS_PER_PAGE;
  const indexOfFirstComment = indexOfLastComment - COMMENTS_PER_PAGE;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบความคิดเห็นนี้?')) {
      try {
        const response = await fetch(`/api/contact?id=${commentId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการลบความคิดเห็น');
        }

        setComments(comments.filter(comment => comment.id !== commentId));
        alert('ลบความคิดเห็นสำเร็จ');
        addNotification(`ลบความคิดเห็น ID: ${commentId}`);
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการลบความคิดเห็น');
      }
    }
  };

  return (
    <main className="p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">แสดงความคิดเห็น</h1>
        
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">ความคิดเห็นทั้งหมด</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">ชื่อ</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">อีเมล</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">เบอร์โทรศัพท์</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">ความคิดเห็น</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">วันที่</th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {currentComments.map((comment) => (
                  <tr key={comment.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2">{comment.name}</td>
                    <td className="px-4 py-2">{comment.email}</td>
                    <td className="px-4 py-2">{comment.phone}</td>
                    <td className="px-4 py-2" dangerouslySetInnerHTML={{ __html: comment.comment }}></td>
                    <td className="px-4 py-2">{new Date(comment.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === number 
                    ? 'bg-gray-500 text-white' 
                    : 'bg-white text-gray-500 border-gray-500 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </section>


        <section className="mb-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">ส่งความคิดเห็นของคุณ</h2>
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300">ชื่อ:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300">อีเมล:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-gray-700 dark:text-gray-300">เบอร์โทรศัพท์:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block mb-2 text-gray-700 dark:text-gray-300">ความคิดเห็น:</label>
              <Editor
                apiKey="zq9aall7gwh3gm0czkrcs1go46n75l6rkzouyzrb401pu2ry"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                value={contactData.comment}
                onEditorChange={handleEditorChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              {isSubmitting ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
            </button>
          </form>
          {submitMessage && (
            <p className={`mt-4 ${submitMessage.includes('สำเร็จ') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {submitMessage}
            </p>
          )}
        </section>

     
      </div>
    </main>
  );
}