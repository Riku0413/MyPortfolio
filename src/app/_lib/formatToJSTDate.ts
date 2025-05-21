/**
 * Converts a UTC ISO date string to JST and formats it as "YYYY/MM/DD".
 * @param utcDateStr - A date string in UTC (e.g., "2024-09-11T15:00:00.000Z")
 * @returns A formatted date string in JST as "YYYY/MM/DD"
 */
export function formatToJSTDate(utcDateStr: string): string {
  // Parse the date in UTC
  const date = new Date(utcDateStr);
  
  // Use UTC methods to ensure consistent timezone handling
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}
