import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

const asCheckable = ({
    /**
     * The prop that the `Field` component uses to pass the form value down.
     * Checkboxes, radios, etc where the value attribute does not equal the
     * visible state often require the form value to be passed down through a
     * different prop for comparison purposes.
     */
    formValueProp = 'formValue',
    /**
     * Whether or not to allow multiple selection. Checkboxes allow for multiple
     * selection, but radios do not. The `Checkable` component will determine
     * the checked state the same way, but will only allow the handler to
     * persist a boolean or single string value.
     */
    multiple = true
} = {}) => (Wrapped) => {
    class Checkable extends React.PureComponent {
        static Wrapped = Wrapped;

        static propTypes = {
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            checked: PropTypes.bool,
            boolean: PropTypes.bool,
            onChange: PropTypes.func,
            onBlur: PropTypes.func,
            forwardedRef: PropTypes.any
        };

        static defaultProps = {
            onChange: noop,
            onBlur: noop
        }

        constructor() {
            super();
            this.onChange = this.onChange.bind(this);
        }

        onChange(ev) {
            console.log('here')
            const {
                boolean,
                value,
                onChange,
                [formValueProp]: formValue
            } = this.props;

            let result;
            if (typeof value === 'undefined' || boolean) {
                result = !this.checked;
            } else if (!multiple) {
                result = this.checked ? null : value;
            } else if (this.checked) {
                result = [].concat(formValue).filter((o) => (o !== value && typeof o !== 'undefined'));
            } else {
                result = [value].concat(formValue).filter((o) => (typeof o !== 'undefined'));
            }

            onChange(ev, result);
        }

        get checked() {
            const {
                boolean,
                checked,
                value,
                [formValueProp]: formValue
            } = this.props;
            if (typeof checked !== 'undefined') {
                return !!checked;
            }
            if (typeof value === 'undefined' || boolean) {
                return typeof checked !== 'undefined' ? checked : (formValue === 'true' || formValue === true);
            }
            if (Array.isArray(formValue)) {
                return formValue.indexOf(value) !== -1;
            }
            return formValue === value;
        }

        render() {
            const {
                boolean,
                forwardedRef,
                [formValueProp]: formValue,
                ...props
            } = this.props;
            return (
                <Wrapped { ...props }
                        checked={ this.checked }
                        onChange={ this.onChange }
                        ref={ forwardedRef } />
            );
        }
    }

    const Forwarded = React.forwardRef((props, ref) => (
        <Checkable { ...props } forwardedRef={ ref } />
    ));
    Forwarded.Wrapped = Checkable;
    return Forwarded;
};

export default asCheckable;
