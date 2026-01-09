import calculateHeartContainers from '../utils/calculateHeartContainers';

describe('calculateHeartContainers', () => {
  it('should return 0 if no health data', () => {
    expect(() => calculateHeartContainers(undefined as any)).toThrow();
    expect(() => calculateHeartContainers(null as any)).toThrow();
  });

  it('should sum up heart containers', () => {
    const health = {
      heart_pieces: { a: { completed: true }, b: { completed: false }, c: { completed: true }, d: { completed: true } },
      heart_containers: { x: { completed: true }, y: { completed: false } },
      info: { min: 3 }
    };
    // 3 completed pieces = 0 extra, 1 completed container, min=3
    expect(calculateHeartContainers(health as any)).toBe(4);
  });
});
