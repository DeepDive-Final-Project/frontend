export const formatTime = (timestamp?: string): string => {
  if (!timestamp) return '';

  const cleanTimestamp = timestamp.split('.')[0] + 'Z';
  const date = new Date(cleanTimestamp);

  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Seoul',
  });
};
