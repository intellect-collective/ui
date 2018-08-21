/**
 * `memoize` remembers previous invocations, and if the next invocation
 * signature matches a previous one, the cached result is returned.
 * @param {Function} func - The function to memoize
 * @param {Function} [resolver] - The key resolver to use during caching
 * @returns {Function} - The memoized instance of the provided function
 */
export default function memoize(func, resolver) {
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (resolver && typeof resolver !== 'function') {
        throw new TypeError('Resolver must be a function');
    }

    // Return a new function with the result cached based on input
    const cache = {};

    return function memoized(...args) {
        const key = resolver ? resolver.apply(this, args) : args[0];
        if (cache[key]) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    };
}
