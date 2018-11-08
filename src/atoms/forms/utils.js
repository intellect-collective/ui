/**
 * Normalize a set of items for use in select or auto-complete inputs.
 *
 * @param {Array|Object} items - An array of title-value objects, or an object
 *         to be broken down
 * @returns {Array} - An array of title-value objects
 */
export const normalizeItems = (items) => {
    // If we received an array of options, they should already be formatted
    // correctly
    if (Array.isArray(items)) {
        return items
            .map(({ title, value }) => ({
                title,
                value,
                key: title
            }));
    }
    return Object.keys(items)
        .map((opt) => {
            return {
                title: items[opt],
                value: opt,
                key: items[opt]
            };
        });
};
