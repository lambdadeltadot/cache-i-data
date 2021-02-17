const EntryData = require('../../EntryData');

describe('EntryData.prototype.remainingTTL()', () => {
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

  /**
   * The reference entry data instance.
   *
   * @type {EntryData}
   */
  let data;

  beforeAll(() => {
    dateNowCache = Date.now;
    Date.now = () => nowTimestamp;
  });

  afterAll(() => {
    Date.now = dateNowCache;
  });

  describe('ttl is null', () => {
    beforeEach(() => {
      data = new EntryData('value', null);
    });

    test('should return null', () => {
      expect(data.remainingTTL()).toBeNull();
    });
  });

  describe('ttl is numeric', () => {
    /**
     * The ttl to use.
     *
     * @type {number}
     */
    const offset = 9999;

    beforeEach(() => {
      data = new EntryData('value', offset);
    });

    test('should return the difference between now and the expiration', () => {
      expect(data.remainingTTL()).toBe(offset);
    });
  });

  describe('ttl is date', () => {
    /**
     * The offset from now for the ttl date.
     *
     * @type {number}
     */
    const offset = 9999;

    beforeEach(() => {
      data = new EntryData('value', new Date(nowTimestamp + offset));
    });

    test('should return the difference between now and the expiration', () => {
      expect(data.remainingTTL()).toBe(offset);
    });
  });

  describe('ttl is date string', () => {
    /**
     * The offset from now for the ttl date.
     *
     * @type {number}
     */
    const offset = 9999;

    beforeEach(() => {
      data = new EntryData('value', new Date(nowTimestamp + offset).toISOString());
    });

    test('should return the difference between now and the expiration', () => {
      expect(data.remainingTTL()).toBe(offset);
    });
  });
});
