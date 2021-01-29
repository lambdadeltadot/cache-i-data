const EntryData = require('../../EntryData');

describe('EntryData.prototype.isExpired()', () => {
  test('should return true if expiration is from the past', () => {
    const data = new EntryData('key', 'value', -10000);
    expect(data.isExpired()).toBeTruthy();
  });

  test('should return false if expiration is from the future', () => {
    const data = new EntryData('key', 'value', 10000);
    expect(data.isExpired()).toBeFalsy();
  });

  test('should return false if expiration is now', () => {
    const dateNow = Date.now;
    const date = new Date();
    Date.now = () => date.getTime();

    const data = new EntryData('key', 'value', date);
    expect(data.isExpired()).toBeFalsy();

    Date.now = dateNow;
  });

  test('should return false if expiration is null', () => {
    const data = new EntryData('key', 'value', null);
    expect(data.isExpired()).toBeFalsy();
  });
});
