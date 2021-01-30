/**
 * Checks if the given date object has a valid value.
 *
 * @param {Date} date the date to check
 *
 * @returns {boolean} true if it is a valid date, otherwise false
 */
module.exports = date => !(/invalid/i.test(date.toString()));
