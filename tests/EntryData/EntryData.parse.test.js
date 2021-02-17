const EntryData = require('../../EntryData');

describe('EntryData.parse(text)', () => {
  describe('exp is null', () => {
    const data = { val: 'unique', exp: null };
    const serializedData = JSON.stringify(data);

    test('should return a new EntryData instance', () => {
      expect(EntryData.parse(serializedData)).toBeInstanceOf(EntryData);
    });

    test('should set the returned data value to value from serialized data', () => {
      const result = EntryData.parse(serializedData);
      expect(result.value).toBe(data.val);
    });

    test('should set the returned data expiration to null', () => {
      const result = EntryData.parse(serializedData);
      expect(result.expiration).toBeNull();
    });
  });

  describe('exp is not null', () => {
    describe('exp is not a string', () => {
      const data = { val: 'unique', exp: 100 };
      const serializedData = JSON.stringify(data);

      test('should throw TypeError', () => {
        expect(() => EntryData.parse(serializedData)).toThrowError(TypeError);
        expect(() => EntryData.parse(serializedData)).toThrowError(/invalid expiration type/);
      });
    });

    describe('exp is a string', () => {
      describe('exp is not an ISO date string', () => {
        const data = { val: 'unique', exp: new Date().toUTCString() };
        const serializedData = JSON.stringify(data);

        test('should throw TypeError', () => {
          expect(() => EntryData.parse(serializedData)).toThrowError(TypeError);
          expect(() => EntryData.parse(serializedData)).toThrowError(/invalid expiration format/);
        });
      });

      describe('exp is an ISO date string', () => {
        const date = new Date();
        const data = { val: 'unique', exp: date.toISOString() };
        const serializedData = JSON.stringify(data);

        test('should return a new EntryData instance', () => {
          expect(EntryData.parse(serializedData)).toBeInstanceOf(EntryData);
        });

        test('should set the returned data value to value from serialized data', () => {
          const result = EntryData.parse(serializedData);
          expect(result.value).toBe(data.val);
        });

        test('should set the returned data expiration to a Date instance', () => {
          const result = EntryData.parse(serializedData);
          expect(result.expiration).toBeInstanceOf(Date);
        });

        test('should set the returned data expiration to the same date with serialized one', () => {
          const result = EntryData.parse(serializedData);
          expect(result.expiration.getTime()).toBe(date.getTime());
        });
      });
    });
  });
});
