import React from 'react';
import PropTypes from 'prop-types';
import { BasicAutoComplete } from '../AutoComplete';
import { asField, asGroupable, compose } from '../utils';

export class StateControlledAutoComplete extends React.Component {
    static propTypes = {
        /**
         * The current value of the field.
         */
        value: PropTypes.any,
        /**
         * Arguments: ``
         *
         * Invoked when the user makes a selection.
         */
        onChange: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {};
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onHighlight = this.onHighlight.bind(this);
    }

    onOpen() {
        this.setState({ open: true });
    }

    onClose() {
        this.setState({
            open: false,
            highlightedIndex: undefined
        });
    }

    onChange(ev) {
        this.setState({ value: ev.target.value });
        this.props.onChange(ev);
    }

    onSelect(ev) {
        this.props.onChange(ev);
        this.onClose(ev);
    }

    onHighlight(ev) {
        this.setState({ highlightedIndex: ev.target.index });
    }

    render() {
        return (
            <BasicAutoComplete { ...this.props }
                    open={ this.state.open }
                    onOpen={ this.onOpen }
                    onClose={ this.onClose }
                    onChange={ this.onChange }
                    onSelect={ this.onSelect }
                    onHighlight={ this.onHighlight }
                    highlightedIndex={ this.state.highlightedIndex }
                    value={ this.props.value || this.state.value } />
        );
    }
}

export default compose(
    asGroupable(),
    asField('value')
)(StateControlledAutoComplete);
