import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

export default (formValueProp = 'formValue', altProps = {}) => (Wrapped) => {
    class AsField extends React.PureComponent {
        static Wrapped = Wrapped;

        static propTypes = {
            forwardedRef: PropTypes.any
        };

        render() {
            const {
                forwardedRef,
                ...props
            } = this.props;
            return (
                <Field { ...props }
                        { ...altProps }
                        component={ Wrapped }
                        formValueProp={ formValueProp }
                        ref={ forwardedRef } />
            );
        }
    }

    const Forwarded = React.forwardRef((props, ref) => (
        <AsField { ...props } forwardedRef={ ref } />
    ));
    Forwarded.Wrapped = AsField;
    return Forwarded;
};
