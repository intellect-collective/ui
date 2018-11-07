import React from 'react';
import PropTypes from 'prop-types';

/**
 * The `checkable` decorator alters the incoming context-sourced data to
 * determine whether the current element is "checked" or not. Typically used for
 * radios, checkboxes, etc.
 *
 * @returns {Function} - A new React Element wrapping the given component
 */
export default () => (Wrapped) => {
    return class Checkable extends React.Component {
        static Wrapped = Wrapped;

        static propTypes = {
            checked: PropTypes.bool,
            value: PropTypes.any,
            _value: PropTypes.any
        };

        constructor() {
            super();
            this.isChecked = this.isChecked.bind(this);
        }

        isChecked() {
            const {
                checked,
                value,
                _value
            } = this.props;
            if (typeof checked !== 'undefined') {
                return checked;
            }

            return (Array.isArray(_value)
                    && _value.indexOf(value) !== -1)
                    || (typeof value !== 'undefined' && value === _value)
                    || _value === true;
        }

        render() {
            const checked = this.isChecked();
            return (
                <Checkable.Wrapped { ...this.props } checked={ checked } />
            );
        }
    };
};
