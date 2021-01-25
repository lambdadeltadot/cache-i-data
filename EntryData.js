const parseTTL = require("./utils/parseTTL");

/**
 * The date to be serialized and save to the cache.
 */
class EntryData {
  /**
   * Parses the serialized string into an Entry Data.
   *
   * @param {string} text the serialized string to parse
   *
   * @returns {EntryData} the parsed entry data
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

    if (expiration !== null || typeof expiration !== 'string') {
      throw new TypeError(`parsed expiration must be a string or null, given ${typeof expiration}`);
    }

    return new EntryData(key, value, expiration);
  }

  /**
   * Create an instance of Entry Data.
   *
   * @param {string}            key   the key for this entry
   * @param {any}               value the value to be saved to the cache
   * @param {null|number|Date}  ttl   the expiration date, or the time to live in millis, or null if does not expire
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
     * The value to be saved.
     *
     * @type {any}
     */
    this.value = value;
  }

  /**
   * Checks if this data already expired.
   *
   * @return {boolean} true if expired, otherwise false
   */
  isExpired () {
    return !!this.expiration && this.expiration.getTime() >= Date.now();
  }

  /**
   * Get the remaining TTL in millis.
   *
   * @return {null|number} the remaining ttl in millis, or null if no expiration
   */
  remainingTTL () {
    return this.expiration && (Date.now() - this.expiration.getTime());
  }

  /**
   * Serializes to a string.
   *
   * @returns {string}
   */
  serialize () {
    return JSON.stringify(this);
  }
}

module.exports = EntryData;
