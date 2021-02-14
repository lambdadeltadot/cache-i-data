const parseTTL = require('./utils/parseTTL');

/**
 * The `EntryData` class stores the data about an cache entry, which includes
 * the `value`, and `expiration` of the entry data.
 *
 * @template T
 */
class EntryData {
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
}

module.exports = EntryData;
