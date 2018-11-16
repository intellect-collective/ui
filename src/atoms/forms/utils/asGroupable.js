import React from 'react';
import PropTypes from 'prop-types';
import { FieldGroupContext } from '../FieldGroup';

/**
 * The `groupContext` decorator allows the developer to wrap groups of certain
 * types of elements in order to provide them with the same name without having
 * to manually wire each element. Supported elements include `Checkbox` and
 * `Radio`, as well as, generally, their subclasses.
 *
 * The `groupContext` decorator does not provide values to its children. Rather,
 * that remains the responsibility of the wrapping `Form`.
 *
 * @returns {Function} - A new React Element wrapping the given component
 */
export default () => (Wrapped) => {
    class AsGrouped extends React.PureComponent {
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
                <FieldGroupContext.Consumer>
                    { (ctx) => (
                        <Wrapped name={ ctx } ref={ forwardedRef } { ...props } />
                    ) }
                </FieldGroupContext.Consumer>
            );
        }
    }
    const Forwarded = React.forwardRef((props, ref) => (
        <AsGrouped { ...props } forwardedRef={ ref } />
    ));
    Forwarded.Wrapped = AsGrouped;
    return Forwarded;
};
