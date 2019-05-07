/**
 * Borrowed from https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab
 *
 * Retrieve a value from a nested object, by path.
 * @param {Object} object - The object to search
 * @param {String|Array<String>} keys - The path to search for
 * @param {mixed} fallback - A fallback value to return if not found
 * @returns {mixed} - The requested value, or the fallback if not found
 */
export default function get(object, keys, fallback = undefined) {
    const tmpKeys = Array.isArray(keys) ? keys : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
    const tmpObject = object[tmpKeys[0]];
    if (tmpObject && tmpKeys.length > 1) {
        return get(tmpObject, tmpKeys.slice(1), fallback);
    }
    return tmpObject === undefined ? fallback : tmpObject;
}
