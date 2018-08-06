import React from 'react';
import PropTypes from 'prop-types';

export default class FancyCheckbox extends React.Component {
    static propTypes = {
        style: PropTypes.object
    };

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.checkbox.click();
    }

    onKeyDown(ev) {
        if (['Enter', ' '].includes(ev.key)) {
            this.checkbox.click();
        }
    }

    render() {
        const {
            style,
            ...props
        } = this.props;
        return (
            <div className="fancycheck">
                <input type="checkbox" { ...props } ref={ (ref) => { this.checkbox = ref; } } />
                <ins role="checkbox"
                        tabIndex={ -1 }
                        aria-checked={ props.checked }
                        onClick={ this.onClick }
                        onKeyDown={ this.onKeyDown }
                        style={ style } />
            </div>
        );
    }
}
