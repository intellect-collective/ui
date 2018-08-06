import PropTypes from 'prop-types';

export const formContext = PropTypes.shape({
    getValue: PropTypes.func,
    setValue: PropTypes.func
});

export const groupValue = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ])
    )
]);

export const groupContext = PropTypes.shape({
    name: PropTypes.string,
    value: groupValue,
    onChange: PropTypes.func
});
