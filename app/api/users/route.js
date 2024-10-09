import { writeFile, readFile, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('avatar');
  const name = formData.get('name');

  if (!file) {
    return NextResponse.json({ error: 'ไม่พบไฟล์' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');

  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // อ่านไฟล์ JSON ปัจจุบัน
    const usersFilePath = path.join(process.cwd(), 'public/json/users.json');
    const usersDataRaw = await readFile(usersFilePath, 'utf8');
    const usersData = JSON.parse(usersDataRaw);

    // สร้างผู้ใช้ใหม่
    const newUser = {
      id: (Math.max(...usersData.map(u => parseInt(u.id))) + 1).toString(),
      name,
      avatar: `/uploads/${filename}`,
      createdAt: new Date().toISOString()
    };

    // เพิ่มผู้ใช้ใหม่ลงในอาร์เรย์
    usersData.push(newUser);

    // เขียนข้อมูลกลับลงในไฟล์ JSON
    await writeFile(usersFilePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json({ message: 'อัปโหลดไฟล์และเพิ่มผู้ใช้สำเร็จ', user: newUser });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์หรือเพิ่มผู้ใช้' }, { status: 500 });
  }
}

export async function PUT(req) {
  const formData = await req.formData();
  const id = formData.get('id');
  const name = formData.get('name');
  const file = formData.get('avatar');

  try {
    const usersFilePath = path.join(process.cwd(), 'public/json/users.json');
    const usersDataRaw = await readFile(usersFilePath, 'utf8');
    let usersData = JSON.parse(usersDataRaw);

    const userIndex = usersData.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
    }

    let avatarPath = usersData[userIndex].avatar;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      avatarPath = `/uploads/${filename}`;
    }

    usersData[userIndex] = {
      ...usersData[userIndex],
      name,
      avatar: avatarPath,
    };

    await writeFile(usersFilePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json({ message: 'อัปเดตผู้ใช้สำเร็จ', user: usersData[userIndex] });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ไม่ระบุ ID ผู้ใช้' }, { status: 400 });
  }

  try {
    const usersFilePath = path.join(process.cwd(), 'public/json/users.json');
    const usersDataRaw = await readFile(usersFilePath, 'utf8');
    let usersData = JSON.parse(usersDataRaw);

    const userIndex = usersData.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
    }

    const deletedUser = usersData[userIndex];

    // ลบไฟล์รูปภาพ (ถ้ามี)
    if (deletedUser.avatar && deletedUser.avatar.startsWith('/uploads/')) {
      const avatarPath = path.join(process.cwd(), 'public', deletedUser.avatar);
      await unlink(avatarPath).catch(console.error);
    }

    // ลบผู้ใช้ออกจากอาร์เรย์
    usersData.splice(userIndex, 1);

    // เขียนข้อมูลกลับลงในไฟล์ JSON
    await writeFile(usersFilePath, JSON.stringify(usersData, null, 2));

    return NextResponse.json({ message: 'ลบผู้ใช้สำเร็จ', deletedUser });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' }, { status: 500 });
  }
}