import calculateProgress from '../utils/calculateProgress';

describe('calculateProgress', () => {
  it('should return 0 for empty input', () => {
    expect(calculateProgress({} as any)).toBe(0);
  });

  it('should calculate progress for completed and incomplete tasks', () => {
    const progressMap = { a: true, b: false, c: true, d: false };
    expect(calculateProgress(progressMap)).toBeCloseTo(50);
  });
});
