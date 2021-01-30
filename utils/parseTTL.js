const isNumber = require('is-number');
const isValidDate = require('./isValidDate');
const offsetFromNow = require('./offsetFromNow');

/**
 * Parses the given ttl into an expiration date.
 *
 * @param {any} ttl     the ttl value to parse
 *
 * @returns {null|Date} the expiration date, or null if given is null
 *
 * @throws {TypeError}  when ttl has invalid type or format
 */
module.exports = ttl => {
  if (ttl === null) return null;

  let date;

  switch (typeof ttl) {
    case 'number':
    case 'string':
      date = isNumber(ttl)
        ? offsetFromNow(+ttl) // if numeric, it means that it is an offset from now
        : new Date(ttl); // if non-numeric, create a date from that string
      break;
    case 'object':
      if (ttl instanceof Date) {
        date = ttl;
      }
      break;
  }

  if (!date || !isValidDate(date)) {
    throw new TypeError('invalid ttl type or format');
  }

  return date;
};
