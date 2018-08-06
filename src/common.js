/**
 * Lifted from Lodash (https://github.com/lodash/lodash/blob/master/isObject.js)
 *
 * @param {*} value - The value to check for object-like-ness
 * @returns {Boolean} - True if the value is an object, false otherwise
 */
export function isObject(value) {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
/**
 * Left-pad the given string with the given string.
 * @param {String} str - The string to pad
 * @param {String} pad - The padding string, at the desired final length
 * @returns {String} - The padded string
 */
export function padLeft(str, pad) {
    return (pad + str).slice(-pad.length);
}
