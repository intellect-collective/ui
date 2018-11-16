import React from 'react';

class Stateful extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.initialState || {};
        this.onChange = this.onChange.bind(this);
        this.setChildRef = this.setChildRef.bind(this);
    }

    onChange(name, value) {
        this.setState({ [name]: value }, () => {
            setTimeout(() => {
                this.setState({ now: new Date() });
            }, 100);
        });
    }

    setChildRef(ref) {
        if (!ref) {
            return;
        }
        this.childRef = ref;
        const oldSetState = ref.setState;
        const _this = this;
        ref.setState = function(o, cb = () => {}) {
            let _cb = () => {
                cb();
                _this.setState({ now: new Date() });
            };
            return oldSetState.call(ref, o, _cb);
        }
    }

    get _state() {
        return (this.childRef || {}).state;
    }

    render() {
        const child = this.props.story();
        return (
            <table>
                <tbody>
                    <tr>
                        <td style={{ width: '50%' }}>
                            { child(this.onChange, this.state, this) }
                        </td>
                        <td style={{ maxWidth: '50vh', width: '50%' }}>
                            <pre>
                            { JSON.stringify(this.state || {}, null, 4) }
                            </pre>
                            <pre>
                            { JSON.stringify(this._state || {}, null, 4) }
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default (initialState, useChildState = false) => (story) => (
    <Stateful initialState={ initialState } useChildState={ useChildState } story={ story } />
);
