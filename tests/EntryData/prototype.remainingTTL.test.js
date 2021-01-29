const EntryData = require('../../EntryData');

describe('EntryData.prototype.remainingTTL()', () => {
  let dateNow;
  const returnDateNow = 1000000;

  beforeAll(() => {
    dateNow = Date.now;
    Date.now = () => returnDateNow;
  });

  afterAll(() => {
    Date.now = dateNow;
  });

  test('should return the difference between now and the expiration if expiration is a valid date', () => {
    const offset = 10000;
    const date = new Date(Date.now() + offset);
    const data = new EntryData('key', 'value', date);
    expect(data.remainingTTL()).toBe(offset);
  });

  test('should return null if expiration is null', () => {
    const data = new EntryData('key', 'value', null);
    expect(data.remainingTTL()).toBeNull();
  });
});
