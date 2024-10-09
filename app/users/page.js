'use client';

import { useState, useEffect, useRef } from 'react';
//import { useTheme } from 'next-themes';

// เปลี่ยน API_URL เป็นพาธของไฟล์ JSON ในแอปพลิเคชัน
const API_URL = '/json/users.json';
//กรณีเรียกจากภายนอก
//const API_URL = 'https://6700a95a4da5bd2375547deb.mockapi.io/api/V1/users';
const USERS_PER_PAGE = 6; // 2 คอลัมน์ x 3 แถว

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  //const { theme, setTheme } = useTheme();

  //const toggleTheme = () => {
  //    setTheme(theme === 'dark' ? 'light' : 'dark');
  //};

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeDialog = () => {
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToCSV = () => {
    const headers = ['ID', 'ชื่อ', 'Avatar URL', 'วันที่สร้าง'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => 
        [user.id, user.name, user.avatar, user.createdAt].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'users.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredUsers, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'users.json');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToXML = () => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';
    filteredUsers.forEach(user => {
      xmlContent += '  <user>\n';
      xmlContent += `    <id>${user.id}</id>\n`;
      xmlContent += `    <name>${user.name}</name>\n`;
      xmlContent += `    <avatar>${user.avatar}</avatar>\n`;
      xmlContent += `    <createdAt>${user.createdAt}</createdAt>\n`;
      xmlContent += '  </user>\n';
    });
    xmlContent += '</users>';

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'users.xml');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [newUser, setNewUser] = useState({ name: '', avatar: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, avatar: '' });
    setPreviewImage(user.avatar);
    setShowAddForm(true);
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

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', editingUser.id);
    formData.append('name', newUser.name);
    if (newUser.avatar instanceof File) {
      formData.append('avatar', newUser.avatar);
    }

    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการอัปเดตผู้ใช้');
      }

      const result = await response.json();
      setUsers(users.map(user => user.id === result.user.id ? result.user : user));
      setFilteredUsers(filteredUsers.map(user => user.id === result.user.id ? result.user : user));
      setNewUser({ name: '', avatar: '' });
      setPreviewImage(null);
      setShowAddForm(false);
      setEditingUser(null);
      alert('อัปเดตผู้ใช้สำเร็จ');
      fetchUsers();
      addNotification(`อัปเดตข้อมูลผู้ใช้: ${result.user.name}`);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตผู้ใช้');
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newUser.name);
    formData.append('avatar', newUser.avatar);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
      }

      const result = await response.json();
      setUsers([...users, result.user]);
      setFilteredUsers([...filteredUsers, result.user]);
      setNewUser({ name: '', avatar: '' });
      setPreviewImage(null);
      setShowAddForm(false);
      alert('เพิ่มผู้ใช้สำเร็จ');
      fetchUsers();
      
      // เพิ่มการแจ้งเตือน
      addNotification(`เพิ่มผู้ใช้ใหม่: ${result.user.name} (ID: ${result.user.id})`);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewUser({ ...newUser, avatar: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setNewUser({ ...newUser, avatar: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
      try {
        const response = await fetch(`/api/users?id=${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการลบผู้ใช้');
        }

        const result = await response.json();
        setUsers(users.filter(user => user.id !== userId));
        setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
        alert('ลบผู้ใช้สำเร็จ');
        addNotification(`ลบผู้ใช้: ${result.deletedUser.name}`);
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('เกิดข้อผิดพลาดในการลบผู้ใช้');
      }
    }
  };

  if (loading) {
    return <div className="p-4">กำลังโหลด...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">ข้อผิดพลาด: {error}</div>;
  }

  return (
    <div className="p-4 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary dark:text-primary-light">รายชื่อผู้ใช้</h1>
        <hr />

        <div className="mb-4">
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingUser(null);
            setNewUser({ name: '', avatar: '' });
            setPreviewImage(null);
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          {showAddForm ? 'ยกเลิก' : 'เพิ่มผู้ใช้ใหม่'}
        </button>
      </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหาผู้ใช้..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-primary rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <button onClick={exportToCSV} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          ส่งออก CSV
        </button>
        <button onClick={exportToJSON} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          ส่งออก JSON
        </button>
        <button onClick={exportToXML} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          ส่งออก XML
        </button>
      </div>


      {showAddForm && (
        <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="mb-4 p-4 border border-primary rounded">
          <div className="mb-2">
            <label htmlFor="name" className="block">ชื่อ:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-primary rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="avatar" className="block">รูปโปรไฟล์:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              className="w-full p-2 border border-primary rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          {previewImage && (
            <div className="mb-2">
              <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                ลบรูปภาพ
              </button>
            </div>
          )}
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            {editingUser ? 'อัปเดตผู้ใช้' : 'เพิ่มผู้ใช้'}
          </button>
        </form>
      )}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="border border-primary p-3 rounded-lg shadow cursor-pointer hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark"
          >
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mb-2" />
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user.id}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">สร้างเมื่อ: {new Date(user.createdAt).toLocaleString()}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEditUser(user)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleUserClick(user)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
              >
                ดูข้อมูล
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredUsers.length === 0 && <p className="text-center mt-4">ไม่พบผู้ใช้ที่ตรงกับการค้นหา</p>}
      {filteredUsers.length > 0 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 border rounded ${
                currentPage === number ? 'bg-primary text-white' : 'bg-white text-primary border-primary dark:bg-gray-700 dark:text-primary-light'
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-primary dark:text-primary-light">ข้อมูลผู้ใช้</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto max-h-96 text-gray-800 dark:text-white">
              {JSON.stringify(selectedUser, null, 2)}
            </pre>
            <button
              onClick={closeDialog}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}