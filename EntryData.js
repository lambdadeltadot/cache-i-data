const parseTTL = require('./utils/parseTTL');

/**
 * The `EntryData` class stores the data about an cache entry, which includes
 * the `value`, and `expiration` of the entry data.
 *
 * @template T
 */
class EntryData {
  /**
   * Parses the text into a EntryData instance.
   *
   * @param {string} text the text to parse
   *
   * @returns {EntryData<T>}
   *
   * @template T
   */
  static parse (text) {
    const {
      exp,
      val
    } = JSON.parse(text);

    if (exp !== null && typeof exp !== 'string') {
      throw new TypeError('invalid expiration type');
    }

    const ttl = exp && new Date(exp);

    if (exp && ttl.toISOString() !== exp) {
      throw new TypeError('invalid expiration format');
    }

    return new EntryData(val, ttl);
  }

  /**
   * Creates an instance of EntryData.
   *
   * @param {T} value the value to be bound to this entry data
   * @param {null|number|Date} ttl the time to live in milliseconds if number, the expiration date if Date, or no expiration if null
   */
  constructor (value, ttl) {
    /**
     * The expiration of this entry data.
     */
    this.expiration = parseTTL(ttl);

    /**
     * The value bound to this entry.
     *
     * @type {T}
     */
    this.value = value;
  }

  /**
   * Checks if this data is already expired.
   *
   * @returns {boolean} true if expiration date already past now, otherwise false, always return false if expiration is null
   */
  isExpired () {
    return !!this.expiration && this.expiration.getTime() < Date.now();
  }

  /**
   * Get the difference in milliseconds between the expiration date and now.
   *
   * @returns {null|number} the remaining ttl in milliseconds, or null if does not expire
   */
  remainingTTL () {
    return this.expiration && (this.expiration.getTime() - Date.now());
  }

  /**
   * Converts this data into a serialized string. Note that this uses `JSON.stringify` under the
   * hood, so make sure the value for this data is serializable by it.
   *
   * @returns {string}
   */
  serialize () {
    const data = {
      exp: this.expiration && this.expiration.toISOString(),
      val: this.value
    };

    return JSON.stringify(data);
  }
}

module.exports = EntryData;
