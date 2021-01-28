const offsetFromNow = require('../../utils/offsetFromNow');

describe('utils/offsetFromNow', () => {
  let dateNow;
  const now = 1000000;

  beforeAll(() => {
    dateNow = Date.now;
    Date.now = () => now;
  });

  afterAll(() => {
    Date.now = dateNow;
  });

  describe('offset is positive', () => {
    test('should return a date in the future', () => {
      const offset = 1000;
      expect(offsetFromNow(offset).getTime()).toBeGreaterThan(now);
    });
  });

  describe('offset is negative', () => {
    test('should return a date from the past', () => {
      const offset = -1000;
      expect(offsetFromNow(offset).getTime()).toBeLessThan(now);
    });
  });

  describe('offset is 0', () => {
    test('should return now', () => {
      const offset = 0;
      expect(offsetFromNow(offset).getTime()).toBe(now);
    });
  });
});
