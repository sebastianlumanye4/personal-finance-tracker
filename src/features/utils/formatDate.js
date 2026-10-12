export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}