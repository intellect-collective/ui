import React from 'react';
import PropTypes from 'prop-types';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const normalizeOptions = (options, val, placeholder, required) => {
    let result = [];

    // If we received an array of options, they should already be formatted
    // correctly
    if (Array.isArray(options)) {
        result = options.map(({ title, value }, i) => ({
            title,
            value,
            key: i
        }));
    } else {
        result = Object.keys(options).map((opt, i) => {
            return {
                title: options[opt],
                value: opt,
                key: i
            };
        });
    }
    if (placeholder || !required) {
        result.unshift({
            title: placeholder || 'Select One',
            disabled: Boolean(required),
            key: '__default__'
        });
    }
    return result;
};
const getValue = (options, value) => {
    if (typeof value !== 'undefined') {
        return value;
    }
    if (Array.isArray(options)) {
        return options.filter((o) => (o.selected))
            .map((o) => (o.value));
    }
    return undefined;
};

const Select = ({
    options, value, placeholder, required, ...props
}) => (
    <select { ...props } required={ required } value={ getValue(options, value) }>
        {
            normalizeOptions(options, value, placeholder, required)
                .map(({ title, ...option }) => (
                    <option { ...option }>
                        { title }
                    </option>
                ))
        }
    </select>
);
Select.displayName = 'Select';
Select.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                value: PropTypes.oneOfType([
                    PropTypes.object,
                    PropTypes.string,
                    PropTypes.number
                ]),
                selected: PropTypes.bool
            })
        )
    ]).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.string,
                PropTypes.number
            ])
        )
    ]),
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

export default formContext(changeable(Select));
