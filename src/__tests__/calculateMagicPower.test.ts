import calculateMagicPower from '../utils/calculateMagicPower';

describe('calculateMagicPower', () => {
  it('should throw if no magic_power data', () => {
    expect(() => calculateMagicPower(undefined as any)).toThrow();
    expect(() => calculateMagicPower(null as any)).toThrow();
  });

  it('should return the magic power value', () => {
    const magic = {
      magic_containers: { a: { completed: true }, b: { completed: false } },
      info: { min: 2 }
    };
    // 1 completed + min 2 = 3
    expect(calculateMagicPower(magic as any)).toBe(3);
  });
});
