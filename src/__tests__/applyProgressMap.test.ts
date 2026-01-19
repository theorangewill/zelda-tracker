import applyProgressMap from '../utils/applyProgressMap';

describe('applyProgressMap', () => {
  it('should apply progress map to data', () => {
    const data = { dungeons: { completed: false }, quests: { completed: false } };
    const progress = { dungeons: true };
    const result = applyProgressMap(data as any, progress as any);
    expect(result.dungeons.completed).toBe(true);
    expect(result.quests.completed).toBe(false);
  });
});
