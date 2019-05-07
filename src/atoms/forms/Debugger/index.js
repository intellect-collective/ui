import React from 'react';

/**
 * The debugger receives a ref as the `debugRef` prop and spies on state changes
 * inside the component represented in the ref. Because it's for debugging, and
 * not for production purposes, we don't bother with any cleanup.
 */
export default class Debugger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.componentDidUpdate({}, {});
    }

    shoudComponentUpdate(nextProps) {
        return this.props.debugRef.current !== prevProps.debugRef.current;
    }

    componentDidUpdate(prevProps, prevState) {
        const { debugRef } = this.props;
        if (!debugRef || !debugRef.current || debugRef.current.setState._name === 'statespy') {
            return;
        }

        const oldSetState = debugRef.current.setState;
        const _this = this;
        debugRef.current.setState = function(o, cb = () => {}) {
            let _cb = () => {
                cb();
                _this.setState({ now: new Date() });
            };
            return oldSetState.call(debugRef.current, o, _cb);
        };
        debugRef.current.setState._name = 'statespy';
    }

    render() {
        const { current } = this.props.debugRef || {};
        return (
            <pre>
                { JSON.stringify((current || {}).state || {}, null, 4) }
            </pre>
        );
    }
}