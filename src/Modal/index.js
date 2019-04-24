import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { onKeyDown } from '../common';

export default class Modal extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onClose: PropTypes.func,
        children: PropTypes.node,
        element: PropTypes.object,
        removeTimeout: PropTypes.number
    };

    static defaultProps = {
        className: 'modal',
        onClose: () => {},
        removeTimeout: 300
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.remove = this.remove.bind(this);
        if (props.element) {
            this.el = props.element;
        } else {
            this.el = document.createElement('DIV');
            document.body.appendChild(this.el);
        }
    }

    componentDidMount() {
        this._render();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.setState({ visible: true });
            });
        });
    }

    componentDidUpdate() {
        this._render(this.state.visible);
    }

    componentWillUnmount() {
        this.state.visible = false;
        this._render(false);
        setTimeout(() => {
            this.remove();
        }, this.props.removeTimeout);
    }

    onOverlayClick(ev) {
        if (!this._dialogRef.contains(ev.target)) {
            this.props.onClose(ev);
        }
    }

    onTransitionEnd() {
        if (!this.state.visible) {
            this.remove();
        }
    }

    remove() {
        ReactDOM.unmountComponentAtNode(this.el);
        this.el.remove();
    }

    renderInner(visible) {
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <div className={ classnames(this.props.className, {
                visible
            }) }
                    tabIndex="-1"
                    role="dialog"
                    onClick={ this.onOverlayClick }
                    onMouseUp={ this.onOverlayClick }
                    onKeyDown={ onKeyDown(this.onOverlayClick, ['Escape']) }
                    onTransitionEnd={ this.onTransitionEnd }
                    ref={ (ref) => { this._outerRef = ref; } }>
                <div className="modal-dialog"
                        ref={ (ref) => { this._dialogRef = ref; } }>
                    <div className="modal-content">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }

    _render(visible) {
        this._ref = ReactDOM.render(this.renderInner(visible), this.el);
    }

    render() {
        return null;
    }
}
