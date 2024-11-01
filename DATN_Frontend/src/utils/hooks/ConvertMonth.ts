export function convertDaysToMonths(days:number) {
    if(days >= 360 && days <= 365) return `1 năm`;
    const months = Math.floor(days / 30);
    const daysInLastMonth = Math.ceil(days - months * 30);
    return `${months ? `${months} tháng` : ""} ${daysInLastMonth ? `${daysInLastMonth} ngày` : ""}`
  }