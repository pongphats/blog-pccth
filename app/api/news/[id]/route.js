import { NextResponse } from "next/server";

let newsData = [
  {
    id: 1,
    title: `“อุตุ” เตือน “ตะวันออก-ใต้-กทม.” ฝนตกหนัก 70% ระวังท่วมฉับพลัน-น้ำป่าไหลหลาก`,
    content:
      "กรมอุตุนิยมวิทยาได้พยากรณ์อากาศ 24 ชั่วโมงข้างหน้าในลักษณะทั่วไปว่า ลมฝ่ายตะวันออกพัดนำความชื้นจากทะเลจีนใต้ และอ่าวไทยเข้ามาปกคลุมภาคตะวันออกเฉียงเหนือ",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: `“ฟินันเซีย” แนะสอย BJC เป้า 31 บาท มองกำไรปี 68 โต 16% รับยอดขายพุ่ง`,
    content: `บริษัทหลักทรัพย์ ฟินันเซีย ไซรัส จำกัด (มหาชน) หรือ FSS ระบุในบทวิเคราะห์วันนี้ (10 ต.ค.67) แนะนำ “ซื้อ” หุ้น บริษัท เบอร์ลี่ ยุคเกอร์ จำกัด (มหาชน) หรือ BJC ราคาเป้าหมายปี 68 ที่ 31 บาท หลังมองว่าการเติบโตของยอดขายสาขาเดิมฟื้นตัวดีในเดือน ก.ย. มาอยู่ที่ 4-5% แม้กระนั้นก็ตามกำไรปกติปี 67 น่าจะลดลง`,
    date: "2023-10-02",
  },
  // ... more news items
];

export async function GET(request, { params }) {
  const { id } = params;
  const newsItem = newsData.find((news) => news.id === parseInt(id));

  if (newsItem) {
    return NextResponse.json(newsItem);
  } else {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}
