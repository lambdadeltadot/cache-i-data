/**
 * Get the date with the given offset from now.
 *
 * @param {number} offset the offset in milliseconds
 *
 * @returns {Date}        the date with offset from now
 */
module.exports = offset => new Date(Date.now() + offset);
