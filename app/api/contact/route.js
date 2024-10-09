import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req) {
  const contactData = await req.json();

  try {
    const contactFilePath = path.join(process.cwd(), 'public/json/contact_data.json');
    let existingData = [];

    try {
      const existingDataRaw = await readFile(contactFilePath, 'utf8');
      existingData = JSON.parse(existingDataRaw);
    } catch (error) {
      // ถ้าไฟล์ยังไม่มีอยู่หรือว่างเปล่า ให้เริ่มต้นด้วยอาร์เรย์ว่าง
      console.log('ไม่พบข้อมูลที่มีอยู่ เริ่มต้นด้วยอาร์เรย์ว่าง');
    }

    // เพิ่มข้อมูลใหม่
    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString()
    };

    existingData.push(newContact);

    // เขียนข้อมูลทั้งหมดกลับลงในไฟล์ JSON
    await writeFile(contactFilePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: 'บันทึกข้อมูลติดต่อสำเร็จ', contact: newContact });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลติดต่อ' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ไม่ระบุ ID ความคิดเห็น' }, { status: 400 });
  }

  try {
    const contactFilePath = path.join(process.cwd(), 'public/json/contact_data.json');
    const contactDataRaw = await readFile(contactFilePath, 'utf8');
    let contactData = JSON.parse(contactDataRaw);

    const commentIndex = contactData.findIndex(comment => comment.id === id);
    if (commentIndex === -1) {
      return NextResponse.json({ error: 'ไม่พบความคิดเห็น' }, { status: 404 });
    }

    const deletedComment = contactData[commentIndex];
    contactData.splice(commentIndex, 1);

    await writeFile(contactFilePath, JSON.stringify(contactData, null, 2));

    return NextResponse.json({ message: 'ลบความคิดเห็นสำเร็จ', deletedComment });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการลบความคิดเห็น' }, { status: 500 });
  }
}