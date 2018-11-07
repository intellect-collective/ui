import React from 'react';
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
export default () => (Wrapped) => (
    class GroupContext extends React.Component {
        static Wrapped = Wrapped;

        render() {
            return (
                <FieldGroupContext.Consumer>
                    { (ctx) => (
                        <GroupContext.Wrapped name={ ctx } { ...this.props } />
                    ) }
                </FieldGroupContext.Consumer>
            );
        }
    }
);
