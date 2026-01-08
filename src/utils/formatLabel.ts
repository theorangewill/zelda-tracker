const CONNECTORS = new Set([
  'of', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from'
]);

export default function formatLabel(input: string): string {
  return input
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Always capitalize first word
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      // Skip connectors
      if (CONNECTORS.has(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
