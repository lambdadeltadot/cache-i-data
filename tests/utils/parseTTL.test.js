const parseTTL = require('../../utils/parseTTL');

describe('utils/parseTTL', () => {
  describe('ttl is null', () => {
    test('should not throw any error', () => {
      expect(() => parseTTL(null)).not.toThrowError();
    });

    test('should return null', () => {
      expect(parseTTL(null)).toBeNull();
    });
  });

  describe('ttl is of type number', () => {
    let dateNow;
    const now = 100000;

    beforeAll(() => {
      dateNow = Date.now;
      Date.now = () => now;
    });

    afterAll(() => {
      Date.now = dateNow;
    });

    test('should return Date offset by the given ttl', () => {
      const offset = 1000;
      expect(parseTTL(offset).getTime()).toBe(now + offset);
    });

    test('should throw TypeError if offset is NaN', () => {
      const offset = NaN;
      expect(() => parseTTL(offset)).toThrowError(TypeError);
    });
  });

  describe('ttl is a string', () => {
    describe('ttl is a numeric string', () => {
      let dateNow;
      const now = 100000;

      beforeAll(() => {
        dateNow = Date.now;
        Date.now = () => now;
      });

      afterAll(() => {
        Date.now = dateNow;
      });

      test('should return Date offset by the given ttl', () => {
        const offset = '1000';
        expect(parseTTL(offset).getTime()).toBe(now + (+offset));
      });
    });

    describe('ttl is not numeric', () => {
      describe('ttl is a valid date string', () => {
        test('should return the date parsed from the date string', () => {
          const dateString = new Date().toISOString();
          expect(parseTTL(dateString).toISOString()).toBe(dateString);
        });
      });

      describe('ttl is not a valid date string', () => {
        test('should throw TypeError', () => {
          const dateString = 'not a valid date string';
          expect(() => parseTTL(dateString)).toThrowError(TypeError);
        });
      });
    });
  });

  describe('ttl is an object', () => {
    describe('ttl is a Date instance', () => {
      test('should return the given valid date instance', () => {
        const date = new Date();
        expect(parseTTL(date)).toBe(date);
      });

      test('should throw TypeError if date is invalid', () => {
        const date = new Date(NaN);
        expect(() => parseTTL(date)).toThrowError(TypeError);
      });
    });

    describe('ttl is not a Date instance', () => {
      test('should throw TypeError', () => {
        expect(() => parseTTL({})).toThrowError(TypeError);
        expect(() => parseTTL([])).toThrowError(TypeError);
        expect(() => parseTTL(/^$/)).toThrowError(TypeError);
      });
    });
  });

  describe('ttl is a boolean', () => {
    test('should throw TypeError', () => {
      expect(() => parseTTL(true)).toThrowError(TypeError);
      expect(() => parseTTL(false)).toThrowError(TypeError);
    });
  });

  describe('ttl is a undefined', () => {
    test('should throw TypeError', () => {
      expect(() => parseTTL(undefined)).toThrowError(TypeError);
    });
  });

  describe('ttl is a function', () => {
    test('should throw TypeError', () => {
      expect(() => parseTTL(() => {})).toThrowError(TypeError);
    });
  });

  describe('ttl is a symbol', () => {
    test('should throw TypeError', () => {
      expect(() => parseTTL(Symbol.for('a'))).toThrowError(TypeError);
    });
  });
});
