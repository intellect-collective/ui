// Lifted from the big boys at
// https://github.com/reduxjs/redux/blob/b4fb08133c95094a4b293a9ab434d1d5dd657527/src/compose.js
export default (...funcs) => {
    if (funcs.length === 0) {
        return (arg) => (arg);
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => (a(b(...args))));
};
