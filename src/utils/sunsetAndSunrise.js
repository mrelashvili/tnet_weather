export function formatTime(timestamp, timezoneOffset) {
  const date = new Date(timestamp * 1000);

  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const newDate = new Date(utc + 3600000 * timezoneOffset);

  return newDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
