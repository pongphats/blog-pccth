import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('body', body);
    
    if (!body) {
      return NextResponse.json({ message: "ไม่พบ body" }, { status: 401 });
    }

    const res = await fetch(`${process.env.KEYCLOAK_HOST}/api/app/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const status = await res.json();
    if (!status.success) {
      throw new Error("การเข้าสู่ระบบล้มเหลว");
    }
    const data = status.data;

    return NextResponse.json(
      {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        access_token: null,
        refresh_token: null,
      },
      { status: 500 }
    );
  }
}
