import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '../../../atoms/forms/AutoComplete';
import formContext from '../../../atoms/forms/_decorators/formContext';
import changeable from '../../../atoms/forms/_decorators/changeable';

export class StateControlledAutoComplete extends React.Component {
    static propTypes = {
        /**
         * The current value of the field.
         */
        value: PropTypes.any,
        /**
         * When provided, allows an ancestral component to contain the state
         * that would otherwise be contained herein.
         */
        state: PropTypes.shape({
            data: PropTypes.object,
            set: PropTypes.func
        }),
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
        this._getState = this._getState.bind(this);
        this._setState = this._setState.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onHighlight = this.onHighlight.bind(this);
    }

    _getState() {
        if (this.props.state) {
            return this.props.state.data;
        }
        return this.state;
    }

    _setState(o) {
        if (this.props.state) {
            this.props.state.set(o);
        } else {
            this.setState(o);
        }
    }

    onOpen() {
        this._setState({ open: true });
    }

    onClose() {
        this._setState({
            open: false,
            highlightedIndex: undefined
        });
    }

    onChange(ev) {
        this._setState({ value: ev.target.value });
        this.props.onChange(ev);
    }

    onSelect(ev) {
        this.props.onChange(ev);
        this.onClose(ev);
    }

    onHighlight(ev) {
        this._setState({ highlightedIndex: ev.target.index });
    }

    render() {
        return (
            <AutoComplete { ...this.props }
                    open={ this._getState().open }
                    onOpen={ this.onOpen }
                    onClose={ this.onClose }
                    onChange={ this.onChange }
                    onSelect={ this.onSelect }
                    onHighlight={ this.onHighlight }
                    highlightedIndex={ this._getState().highlightedIndex }
                    value={ this.props.value || this._getState().value } />
        );
    }
}

export default formContext(changeable(StateControlledAutoComplete));
