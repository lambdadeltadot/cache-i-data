const parseTTL = require('./utils/parseTTL');

/**
 * The `EntryData` class stores the data about an cache entry, which includes the `key`, `value`, and `expiration` of the entry data.
 */
class EntryData {
  /**
   * Parses the serialized string into an Entry Data.
   *
   * @param {string} text the serialized string to parse
   *
   * @returns {EntryData} the parsed entry data instance
   *
   * @throws {TypeError}  when any of parsed data has invalid type
   * @throws {Error}      when the parsed expiration string is not a valid ISO date string
   */
  static parse (text) {
    const {
      expiration,
      key,
      value
    } = JSON.parse(text);

    if (typeof key !== 'string') {
      throw new TypeError(`parsed key must be a string, given ${typeof key}`);
    }

    if (expiration !== null && typeof expiration !== 'string') {
      throw new TypeError(`parsed expiration must be a string or null, given ${typeof expiration}`);
    }

    if (expiration && new Date(expiration).toISOString() !== expiration) {
      throw new Error('parsed expiration has invalid format');
    }

    return new EntryData(key, value, expiration);
  }

  /**
   * Creates an instance of Entry Data.
   *
   * @param {string}            key   the key for this entry
   * @param {any}               value the value to be saved to the cache
   * @param {null|number|Date}  ttl   the expiration date, or the time to live in milliseconds, or null if does not expire
   *
   * @throws {TypeError}              when the ttl has invalid type or format
   */
  constructor (key, value, ttl) {
    /**
     * The expiration date for the entry.
     *
     * @type {null|Date}
     */
    this.expiration = parseTTL(ttl);

    /**
     * The key for this entry.
     *
     * @type {string}
     */
    this.key = `${key}`;

    /**
     * The value of this entry.
     *
     * @type {any}
     */
    this.value = value;
  }

  /**
   * Checks if this data already expired.
   *
   * @return {boolean} true if expiration date already past now, otherwise false, also return false if expiration is null
   */
  isExpired () {
    return !!this.expiration && this.expiration.getTime() < Date.now();
  }

  /**
   * Get the difference in milliseconds between the expiration date and now.
   *
   * @return {null|number} the remaining ttl in milliseconds, or null if no expiration
   */
  remainingTTL () {
    return this.expiration && (this.expiration.getTime() - Date.now());
  }

  /**
   * Convert this data into serializable string. Note that this uses `JSON.stringify` so
   * make sure that the value of this data is serializable by it.
   *
   * @returns {string}
   */
  serialize () {
    return JSON.stringify(this);
  }
}

module.exports = EntryData;
