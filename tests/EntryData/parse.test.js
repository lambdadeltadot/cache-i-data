const EntryData = require('../../EntryData');

describe('EntryData.prototype.parse(text)', () => {
  let data;

  const serializeData = () => JSON.stringify(data);

  beforeEach(() => {
    data = {
      key: 'key',
      value: 'value',
      expiration: new Date()
    };
  });

  describe('key is not a string', () => {
    beforeEach(() => {
      data.key = null;
    });

    test('should throw TypeError', () => {
      const text = serializeData();
      expect(() => EntryData.parse(text)).toThrowError(TypeError);
      expect(() => EntryData.parse(text)).toThrowError(/parsed key/i);
    });
  });

  describe('key is a string', () => {
    describe('expiration is a boolean', () => {
      beforeEach(() => {
        data.expiration = true;
      });

      test('should throw TypeError', () => {
        const text = serializeData();
        expect(() => EntryData.parse(text)).toThrowError(TypeError);
        expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
        expect(() => EntryData.parse(text)).toThrowError(/string or null/i);
      });
    });

    describe('expiration is a function', () => {
      beforeEach(() => {
        data.expiration = () => {};
      });

      test('should throw TypeError', () => {
        const text = serializeData();
        expect(() => EntryData.parse(text)).toThrowError(TypeError);
        expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
        expect(() => EntryData.parse(text)).toThrowError(/string or null/i);
      });
    });

    describe('expiration is a number', () => {
      beforeEach(() => {
        data.expiration = 1;
      });

      test('should throw TypeError', () => {
        const text = serializeData();
        expect(() => EntryData.parse(text)).toThrowError(TypeError);
        expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
        expect(() => EntryData.parse(text)).toThrowError(/string or null/i);
      });
    });

    describe('expiration is a symbol', () => {
      beforeEach(() => {
        data.expiration = Symbol.for('a');
      });

      test('should throw TypeError', () => {
        const text = serializeData();
        expect(() => EntryData.parse(text)).toThrowError(TypeError);
        expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
        expect(() => EntryData.parse(text)).toThrowError(/string or null/i);
      });
    });

    describe('expiration is an object', () => {
      beforeEach(() => {
        data.expiration = {};
      });

      test('should throw TypeError', () => {
        const text = serializeData();
        expect(() => EntryData.parse(text)).toThrowError(TypeError);
        expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
        expect(() => EntryData.parse(text)).toThrowError(/string or null/i);
      });
    });

    describe('expiration is an undefined', () => {
      beforeEach(() => {
        data.expiration = undefined;
      });

      test('should throw TypeError', () => {
        const text = serializeData();
        expect(() => EntryData.parse(text)).toThrowError(TypeError);
        expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
        expect(() => EntryData.parse(text)).toThrowError(/string or null/i);
      });
    });

    describe('expiration is null', () => {
      beforeEach(() => {
        data.expiration = null;
      });

      test('should create an Entry Data with null expiration', () => {
        const text = serializeData();
        const data = EntryData.parse(text);
        expect(data).toBeInstanceOf(EntryData);
        expect(data.expiration).toBeNull();
      });
    });

    describe('expiration is a string', () => {
      describe('expiration is not a date string', () => {
        beforeEach(() => {
          data.expiration = 'not a date string';
        });

        test('should throw RangeError (built-in invalid date range)', () => {
          const text = serializeData();
          expect(() => EntryData.parse(text)).toThrowError(RangeError);
        });
      });

      describe('expiration is not an ISO date string', () => {
        beforeEach(() => {
          data.expiration = new Date().toUTCString();
        });

        test('should throw Error', () => {
          const text = serializeData();
          expect(() => EntryData.parse(text)).toThrowError(Error);
          expect(() => EntryData.parse(text)).toThrowError(/parsed expiration/i);
          expect(() => EntryData.parse(text)).toThrowError(/invalid format/i);
        });
      });

      describe('expiration is an ISO date string parsed from a JS Date object', () => {
        let expirationString;
        beforeEach(() => {
          expirationString = data.expiration = new Date().toISOString();
        });

        test('should throw Error', () => {
          const text = serializeData();
          const data = EntryData.parse(text);
          expect(data).toBeInstanceOf(EntryData);
          expect(data.expiration.toISOString()).toBe(expirationString);
        });
      });
    });
  });

  describe('value testing', () => {
    test('should have value same from the serialized one', () => {
      data.value = {
        a: {
          b: {
            c: 1
          },
          d: null
        },
        c: ''
      };

      const text = serializeData();
      expect(EntryData.parse(text).value).toEqual(data.value);
    });
  });
});
