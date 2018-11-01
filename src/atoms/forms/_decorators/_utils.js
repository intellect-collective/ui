/* eslint-disable react/forbid-foreign-prop-types */

export const getHandlerName = (wrapped) => {
    if (wrapped.propTypes && wrapped.propTypes.onClick) {
        return 'onClick';
    }
    if (wrapped.propTypes && wrapped.propTypes.onChange) {
        return 'onChange';
    }
    if (wrapped.wrapped) {
        return getHandlerName(wrapped.wrapped);
    }
    return undefined;
};

export const checkedGroupTransformer = ({ name, value, checked }, { group }) => {
    const result = {};

    if (typeof checked !== 'undefined') {
        result.checked = checked;
    } else if (group && typeof group.value !== 'undefined' && (typeof name === 'undefined' || group.name === name)) {
        result.checked = value === group.value || group.value.indexOf(value) !== -1;
    }

    return result;
};

export const checkedFormTransformer = ({ name, value, checked }, { form }) => {
    const result = {};

    if (typeof checked !== 'undefined') {
        result.checked = checked;
    } else if (form && typeof form.getValue(name) !== 'undefined') {
        const val = form.getValue(name);
        result.checked = Array.isArray(val) ? val.indexOf(value) !== -1 : val === value;
    }

    return result;
};

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

export const getWrapped = (wrapped) => {
    if (wrapped.wrapped) {
        return getWrapped(wrapped.wrapped);
    }
    return wrapped;
};
