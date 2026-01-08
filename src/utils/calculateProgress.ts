

export default function calculateProgress(progressMap: Record<string, boolean>): number {
  const keys = Object.keys(progressMap);
  if (keys.length === 0) return 0;
  const completed = keys.reduce((s, k) => s + (progressMap[k] ? 1 : 0), 0);
  const percent = Math.round((completed / keys.length) * 100);
  return percent === 100 && completed !== keys.length? 99 : percent;
}