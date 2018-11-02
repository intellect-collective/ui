import { isAfter, isBefore, isSameDay } from 'date-fns';

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
/**
 * Produces an onKeyDown handler for a given component that calls another
 * function under the right conditions. Consider the following:
 * ```
 * <a onClick={ this.onSort(col.id, dir) }
 *         onKeyDown={ onKeyDown(this.onSort(col.id, dir)) }>
 * ```
 * In the above circumstance, the act of clicking on the anchor calls the
 * sorting function, but we need to have a keyboard handler as well, so we can
 * pass the sorting function to this one, and have it wrap everything up nice
 * and neat.
 * @param {Function} func - The handler function to wrap
 * @param {String[]} keys - The keys to watch for
 * @returns {Function} - An event-handler function that reacts to the enter and
 *         spacebar keystrokes.
 */
export function onKeyDown(func, keys = ['Enter', ' ']) {
    return (ev) => {
        if (keys.includes(ev.key)) {
            return func(ev);
        }
    };
}
/**
 * Determines whether or not the first given date is the same day as, or before,
 * the second given date.
 * @param {Date} dateLeft - The first date to compare
 * @param {Date} dateRight - The second date to compare
 * @returns {Boolean} - True if the first date is same or before the second
 */
export function isSameOrBefore(dateLeft, dateRight) {
    return isSameDay(dateLeft, dateRight) || isBefore(dateLeft, dateRight);
}
/**
 * Determines whether or not the first given date is the same day as, or after,
 * the second given date.
 * @param {Date} dateLeft - The first date to compare
 * @param {Date} dateRight - The second date to compare
 * @returns {Boolean} - True if the first date is same or after the second
 */
export function isSameOrAfter(dateLeft, dateRight) {
    return isSameDay(dateLeft, dateRight) || isAfter(dateLeft, dateRight);
}
