import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import OutsideClickWatcher from '../../atoms/OutsideClickWatcher';
import { onKeyDown } from '../../common';

export default class Modal extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onClose: PropTypes.func,
        children: PropTypes.node
    };

    static defaultProps = {
        className: 'modal',
        onClose: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.onOverlayClick = this.onOverlayClick.bind(this);
    }

    onOverlayClick(ev) {
        if (!this._dialogRef.contains(ev.target)) {
            this.props.onClose(ev);
        }
    }

    render() {
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <div className={ classnames(this.props.className) }
                    tabIndex="-1"
                    role="dialog"
                    onClick={ this.onOverlayClick }
                    onMouseUp={ this.onOverlayClick }
                    onKeyDown={ onKeyDown(this.onOverlayClick, ['Escape']) }
                    ref={ (ref) => { this._outerRef = ref; } }>
                <div className="modal-dialog"
                        ref={ (ref) => { this._dialogRef = ref; } }>
                    <OutsideClickWatcher onClick={ this.onClose }>
                        <div className="modal-content">
                            { this.props.children }
                        </div>
                    </OutsideClickWatcher>
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
}
