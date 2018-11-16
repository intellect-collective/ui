export default (fn) => () => {
    /* eslint-disable no-console */
    const oldWarn = console.warn;
    const oldError = console.error;
    console.warn = jest.fn();
    console.error = jest.fn();
    try {
        fn();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    } catch (err) {
        oldError(err);
    }
    console.warn = oldWarn;
    console.error = oldError;
    /* eslint-enable no-console */
};
