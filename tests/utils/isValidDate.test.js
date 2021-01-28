const isValidDate = require('../../utils/isValidDate');

describe('utils/isValidDate', () => {
  test('should return false if date is invalid', () => {
    const date = new Date('not a valid date format');
    expect(isValidDate(date)).toBeFalsy();
  });

  test('should return false if date is valid', () => {
    const date = new Date();
    expect(isValidDate(date)).toBeTruthy();
  });
});
