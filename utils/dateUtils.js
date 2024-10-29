// dateUtils.js
export function formatDateAndTime(commentCreateDate) {
    const date = new Date(commentCreateDate);
    const monthsTh = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const buddhistYear = date.getFullYear() + 543;
    return `${date.getUTCDate()} ${monthsTh[date.getUTCMonth()]} ${buddhistYear} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')} น.`;
}


export function formatDate(commentCreateDate) {
    const date = new Date(commentCreateDate);
    const monthsTh = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const buddhistYear = date.getUTCFullYear() + 543;
    
    return `${date.getUTCDate()} ${monthsTh[date.getUTCMonth()]} ${buddhistYear}`;
}