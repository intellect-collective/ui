export default (fn, warning) => {
    /* eslint-disable no-console */
    const oldError = console.error;
    console.error = jest.fn();
    try {
        fn();
    } catch (err) {
        oldError(err);
    }
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toMatch(warning);
    console.error = oldError;
    /* eslint-enable no-console */
};
