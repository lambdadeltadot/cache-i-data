const EntryData = require('../../EntryData');

describe('EntryData.prototype.isExpired()', () => {
  /**
   * The reference entry data instance.
   *
   * @type {EntryData}
   */
  let data;

  describe('expiration is null', () => {
    beforeEach(() => {
      data = new EntryData('value', null);
    });

    test('should return false', () => {
      expect(data.isExpired()).toBeFalsy();
    });
  });

  describe('expiration is on the future', () => {
    beforeEach(() => {
      data = new EntryData('value', 99999);
    });

    test('should return false', () => {
      expect(data.isExpired()).toBeFalsy();
    });
  });

  describe('expiration is on the past', () => {
    beforeEach(() => {
      data = new EntryData('value', -99999);
    });

    test('should return true', () => {
      expect(data.isExpired()).toBeTruthy();
    });
  });

  describe('expiration is now', () => {
    /**
     * The timestamp to be returned by Date.now().
     *
     * @type {number}
     */
    const nowTimestamp = 1000000;

    /**
     * The cache for the original implementation of Date.now().
     *
     * @type {() => number}
     */
    let dateNowCache;

    beforeAll(() => {
      dateNowCache = Date.now;
      Date.now = () => nowTimestamp;
    });

    afterAll(() => {
      Date.now = dateNowCache;
    });

    beforeEach(() => {
      data = new EntryData('value', nowTimestamp);
    });

    test('should return false', () => {
      expect(data.isExpired()).toBeFalsy();
    });
  });
});
