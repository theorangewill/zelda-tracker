import applyProgressMap from '../utils/applyProgressMap';

describe('applyProgressMap', () => {
  it('should apply progress map to data', () => {
    const data = { a: { completed: false }, b: { completed: false } };
    const progress = { a: true };
    const result = applyProgressMap(data as any, progress as any);
    expect(result.a.completed).toBe(true);
    expect(result.b.completed).toBe(false);
  });
});
