export function dateToString(date: Date | null): string {
  if (!date) {
    return '';
  }

  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateParts = dateString.split('/');
  const year = dateParts[2];
  const month = dateParts[0].padStart(2, '0');
  const day = dateParts[1].padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatRuntime(minutes: number | undefined) {
  if (!minutes) {
    return '';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}
