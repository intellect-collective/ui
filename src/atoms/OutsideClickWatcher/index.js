import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class OutsideClickWatcher extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.element.isRequired
    };

    constructor(props) {
        super(props);
        this.onOutsideClick = this.onOutsideClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onOutsideClick, false);
    }

    onOutsideClick(e) {
        /* eslint-disable react/no-find-dom-node */
        if (ReactDOM.findDOMNode(this).contains(e.target) || !this.props.onClick) {
            return;
        }
        this.props.onClick(e);
    }

    render() {
        return this.props.children;
    }
}
