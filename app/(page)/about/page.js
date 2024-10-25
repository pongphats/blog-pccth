'use client';

import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Link from 'next/link';
import { Editor } from '@tinymce/tinymce-react';

export default function About() {
  const [releaseNotes, setReleaseNotes] = useState([]);
  const [expandedVersions, setExpandedVersions] = useState(['2.1.0']);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'เกี่ยวกับเรา', href: '/about' },
  ];

  const mdFiles = [
    { name: 'README.md', label: 'README' },
    { name: 'RELEASE.md', label: 'Release Notes' },
    { name: 'SITEMAP_TH.md', label: 'Sitemap (TH)' },
    { name: 'SITEMAP.md', label: 'Sitemap (EN)' },
  ];

  useEffect(() => {
    // ในที่นี้เราจะใช้ข้อมูลจำลอง แต่ในการใช้งานจริงคุณอาจจะดึงข้อมูลจาก API หรือไฟล์
    const mockReleaseNotes = [
      {
        version: '2.1.0',
        date: '15 ตุลาคม 2024',
        features: [
          {
            title: 'ระบบแจ้งเตือนแบบเรียลไทม์',
            details: [
              'แจ้งเตือนทันทีเมื่อมีการเพิ่ม แก้ไข หรือลบข้อมูลผู้ใช้และความคิดเห็น',
              'สามารถดูและจัดการการแจ้งเตือนได้จากแถบนำทางด้านบน'
            ]
          },
          {
            title: 'Rich Text Editor สำหรับความคิดเห็น',
            details: [
              'ใช้ TinyMCE เพื่อเพิ่มความสามารถในการจัดรูปแบบข้อความ',
              'รองรับการแทรกรูปภาพและลิงก์ในความคิดเห็น'
            ]
          },
          {
            title: 'ปรับปรุงหน้าแดชบอร์ด',
            details: [
              'แสดงสถิติจำนวนผู้ใช้ ความคิดเห็น และการแจ้งเตือนแบบเรียลไทม์',
              'เพิ่มลิงก์ด่วนไปยังส่วนต่างๆ ของแอปพลิเคชัน'
            ]
          }
        ],
        improvements: [
          'เพิ่มการป้องกัน XSS ในการแสดงความคิดเห็น',
          'ปรับปรุงประสิทธิภาพการโหลดข้อมูลด้วยการใช้ Lazy-loading',
          'เพิ่มการจัดการข้อผิดพลาดที่ครอบคลุมและข้อความแจ้งเตือนผู้ใช้ที่เป็นมิตร'
        ]
      },
      {
        version: '2.0.0',
        date: '1 ตุลาคม 2024',
        features: [
          {
            title: 'ระบบจัดการผู้ใช้ที่ปรับปรุงใหม่',
            details: [
              'เพิ่ม แก้ไข และลบข้อมูลผู้ใช้แบบเรียลไทม์',
              'อัปโหลดและจัดการรูปโปรไฟล์ผู้ใช้'
            ]
          },
          {
            title: 'ระบบความคิดเห็นที่ทรงพลัง',
            details: [
              'แสดงความคิดเห็นแบบ HTML ที่ปลอดภัย',
              'การลบความคิดเห็นพร้อมการยืนยัน'
            ]
          }
        ],
        improvements: [
          'เพิ่มโหมดธีมมืด/สว่าง',
          'ปรับปรุงการนำทางด้วย Breadcrumb'
        ]
      }
    ];
    setReleaseNotes(mockReleaseNotes);
  }, []);

  const toggleVersion = (version) => {
    setExpandedVersions(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  const openFileDialog = async (fileName) => {
    try {
      const response = await fetch(`/${fileName}`);
      const content = await response.text();
      setFileContent(content);
      setSelectedFile(fileName);
      setIsEditing(false);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  const closeFileDialog = () => {
    setSelectedFile(null);
    setFileContent('');
    setIsEditing(false);
  };

  const handleEditorChange = (content, editor) => {
    setFileContent(content);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    // ในที่นี้คุณอาจต้องการเพิ่มโค้ดสำหรับการบันทึกการเปลี่ยนแปลงไปยังเซิร์ฟเวอร์
    // เช่น ส่ง POST request ไปยัง API endpoint
    console.log('Saving changes:', fileContent);
    setIsEditing(false);
  };

  const downloadFile = () => {
    const blob = new Blob([fileContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold mt-8 mb-6 text-gray-800 dark:text-white">เกี่ยวกับเรา</h1>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600 dark:text-blue-400">บันทึกการเผยแพร่ (Release Notes)</h2>
          {releaseNotes.map((release, index) => (
            <div key={release.version} className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div 
                className="flex justify-between items-center cursor-pointer bg-blue-50 dark:bg-blue-900 p-4"
                onClick={() => toggleVersion(release.version)}
              >
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  เวอร์ชัน {release.version}
                </h3>
                <span className="text-2xl text-blue-600 dark:text-blue-400">
                  {expandedVersions.includes(release.version) ? '−' : '+'}
                </span>
              </div>
              {expandedVersions.includes(release.version) && (
                <div className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{release.date}</p>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">คุณสมบัติใหม่</h4>
                      {release.features.map((feature, fIndex) => (
                        <div key={fIndex} className="mb-4">
                          <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300">{feature.title}</h5>
                          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                            {feature.details.map((detail, dIndex) => (
                              <li key={dIndex} className="text-gray-600 dark:text-gray-400">{detail}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">การปรับปรุง</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {release.improvements.map((improvement, iIndex) => (
                          <li key={iIndex} className="text-gray-600 dark:text-gray-400">{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
        
        <section className="bg-blue-50 dark:bg-blue-900 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">ขอบคุณที่ใช้งานแอปพลิเคชันของเรา</h2>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            เราขอขอบคุณชุมชนนักพัฒนาและผู้ใช้ทุกท่านสำหรับข้อเสนอแนะและการสนับสนุน เรามุ่งมั่นที่จะปรับปรุงและพัฒนาแอปพลิเคชันของเราอย่างต่อเนื่องเพื่อมอบประสบการณ์ที่ดีที่สุดให้กับผู้ใช้ของเรา
          </p>
          <p className="text-blue-700 dark:text-blue-300">
            โปรดติดตามการอัปเดตและคุณสมบัติใหม่ๆ ที่จะมาในเร็วๆ นี้!
          </p>
        </section>
        
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">เอกสารที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mdFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => openFileDialog(file.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {file.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ป๊อปอัพไดอะล็อกสำหรับแสดงเนื้อหาไฟล์ */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedFile}</h2>
              <div>
                <button
                  onClick={downloadFile}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  ดาวน์โหลด
                </button>
                <button
                  onClick={toggleEditMode}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  {isEditing ? 'ดูเนื้อหา' : 'เนื้อหาไฟล์'}
                </button>
                {isEditing && (
                  <button
                    onClick={saveChanges}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    บันทึกไฟล์
                  </button>
                )}
                <button
                  onClick={closeFileDialog}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  ปิด
                </button>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {isEditing ? (
                <Editor
                  apiKey="zq9aall7gwh3gm0czkrcs1go46n75l6rkzouyzrb401pu2ry"
                  initialValue={fileContent}
                  init={{
                    height: 500,
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
                  onEditorChange={handleEditorChange}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}