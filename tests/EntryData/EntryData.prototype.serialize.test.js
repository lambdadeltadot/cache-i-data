const EntryData = require('../../EntryData');

describe('EntryData.prototype.serialize()', () => {
  describe('value testing', () => {
    test('should serialize the value on val key', () => {
      const value = 'unique';
      const data = new EntryData(value, null);

      expect(data.serialize()).toMatch(new RegExp(`"val":"${value}"`));
    });
  });

  describe('expiration testing', () => {
    describe('expiration is null', () => {
      test('should serialize the expiration on exp key', () => {
        const data = new EntryData('value', null);
        expect(data.serialize()).toMatch(/"exp":null/);
      });
    });

    describe('expiration is not null', () => {
      test('should serialize the expiration on exp key', () => {
        const date = new Date();
        const data = new EntryData('value', date);
        expect(data.serialize()).toMatch(new RegExp(`"exp":"${date.toISOString()}"`));
      });
    });
  });
});
