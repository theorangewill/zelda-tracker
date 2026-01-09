import applyProgressMap from '../utils/applyProgressMap';

describe('applyProgressMap', () => {
  it('should apply progress map to data', () => {
    const data = { dungeons: { completed: false }, side_quests: { completed: false } };
    const progress = { dungeons: true };
    const result = applyProgressMap(data as any, progress as any);
    expect(result.dungeons.completed).toBe(true);
    expect(result.side_quests.completed).toBe(false);
  });
});
