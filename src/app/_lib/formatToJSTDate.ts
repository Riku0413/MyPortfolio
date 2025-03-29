/**
 * Converts a UTC ISO date string to JST and formats it as "YYYY/MM/DD".
 * @param utcDateStr - A date string in UTC (e.g., "2024-09-11T15:00:00.000Z")
 * @returns A formatted date string in JST as "YYYY/MM/DD"
 */
export function formatToJSTDate(utcDateStr: string): string {
  const date = new Date(utcDateStr);

  // 日本時間に変換（UTC → JST）
  const jstYear = date.getFullYear();
  const jstMonth = String(date.getMonth() + 1).padStart(2, "0"); // 月は0始まり
  const jstDate = String(date.getDate()).padStart(2, "0");

  return `${jstYear}/${jstMonth}/${jstDate}`;
}
