const EntryData = require('../../EntryData');

describe('EntryData.prototype.serialize()', () => {
  test('should return the JSON.stringify form of the object with null expiration', () => {
    const data = new EntryData('key', 'value', null);
    expect(data.serialize()).toBe(JSON.stringify(data));
  });

  test('should return the JSON.stringify form of the object with date expiration', () => {
    const data = new EntryData('key', 'value', new Date());
    expect(data.serialize()).toBe(JSON.stringify(data));
  });
});
