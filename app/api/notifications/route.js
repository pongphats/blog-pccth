import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const MAX_NOTIFICATIONS = 20; // จำกัดจำนวนการแจ้งเตือนที่เก็บไว้

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public/json/notifications.json');
    const fileContents = await readFile(filePath, 'utf8');
    const notifications = JSON.parse(fileContents);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error reading notifications:', error);
    return NextResponse.json({ error: 'Failed to read notifications' }, { status: 500 });
  }
}

export async function POST(req) {
  const { message } = await req.json();
  try {
    const filePath = path.join(process.cwd(), 'public/json/notifications.json');
    const fileContents = await readFile(filePath, 'utf8');
    let notifications = JSON.parse(fileContents);
    
    const newNotification = {
      id: Date.now().toString(),
      message,
      createdAt: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    
    // จำกัดจำนวนการแจ้งเตือน
    if (notifications.length > MAX_NOTIFICATIONS) {
      notifications = notifications.slice(-MAX_NOTIFICATIONS);
    }
    
    await writeFile(filePath, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json(newNotification);
  } catch (error) {
    console.error('Error adding notification:', error);
    return NextResponse.json({ error: 'Failed to add notification' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const filePath = path.join(process.cwd(), 'public/json/notifications.json');
    const fileContents = await readFile(filePath, 'utf8');
    let notifications = JSON.parse(fileContents);
    
    if (id === 'all') {
      // ลบการแจ้งเตือนทั้งหมด
      notifications = [];
    } else {
      // ลบการแจ้งเตือนเฉพาะ ID ที่ระบุ
      notifications = notifications.filter(notification => notification.id !== id);
    }
    
    await writeFile(filePath, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json({ message: 'Notification(s) deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification(s):', error);
    return NextResponse.json({ error: 'Failed to delete notification(s)' }, { status: 500 });
  }
}