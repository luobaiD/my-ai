export default function timeDifference(time:any) {
  // 获取当前时间的年月日
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 月份从 0 开始，所以要加 1
  const currentDay = now.getDate();

  const itemDate = time.date; // 假设 item.date 是 'YYYY-MM-DD' 格式的字符串

  // 解析 item.date
  const [year, month, day] = itemDate.split('-').map(Number);

  // 计算与当前日期的天数差
  const itemDateObj = new Date(year, month - 1, day); // 月份从 0 开始，所以要减 1
  const nowDateObj = new Date(currentYear, currentMonth - 1, currentDay);
  const timeDiff = nowDateObj.getTime() - itemDateObj.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff;
}