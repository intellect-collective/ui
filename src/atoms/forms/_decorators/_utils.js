/* eslint-disable react/forbid-foreign-prop-types */

// Lifted from the big boys at
// https://github.com/reduxjs/redux/blob/b4fb08133c95094a4b293a9ab434d1d5dd657527/src/compose.js
export const compose = (...funcs) => {
    if (funcs.length === 0) {
        return (arg) => (arg);
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => (a(b(...args))));
};

export const getWrapped = (Component) => {
    if (Component.Wrapped) {
        return getWrapped(Component.Wrapped);
    }
    return Component;
};

export const getHandlerName = (Component) => {
    if (Component.propTypes && Component.propTypes.onClick) {
        return 'onClick';
    }
    if (Component.propTypes && Component.propTypes.onChange) {
        return 'onChange';
    }
    if (Component.Wrapped) {
        return getHandlerName(Component.Wrapped);
    }
    return undefined;
};
