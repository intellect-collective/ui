/**
 * `memoizeLast` remembers only the last invocation, and if the next invocation
 * signature matches the last, the cached result is returned.
 * @param {Function} func - The function to memoize
 * @param {Function} [resolver] - The key resolver to use during caching
 * @returns {Function} - The memoized instance of the provided function
 */
export default function memoizeLast(func, resolver) {
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (resolver && typeof resolver !== 'function') {
        throw new TypeError('Resolver must be a function');
    }

    let lastKey;
    let lastValue;

    return function memoized(...args) {
        const key = resolver ? resolver.apply(this, args) : args[0];
        if (lastKey === key) {
            return lastValue;
        }

        lastKey = key;
        lastValue = func.apply(this, args);
        return lastValue;
    };
}
