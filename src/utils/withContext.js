import React from 'react';
import PropTypes from 'prop-types';

export default (Context) => (Wrapped) => {
    class WithContext extends React.PureComponent {
        static propTypes = {
            forwardedRef: PropTypes.any
        };

        render() {
            const {
                forwardedRef,
                ...props
            } = this.props;
            return (
                <Context.Consumer>
                    { (ctx) => (<Wrapped { ...props } context={ ctx } ref={ forwardedRef } />) }
                </Context.Consumer>
            );
        }
    }
    const Forwarded = React.forwardRef((props, ref) => (
        <WithContext { ...props } forwardedRef={ ref } />
    ));
    Forwarded.Wrapped = WithContext;
    return Forwarded;
};
