import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const renderItems = (name, items = [], onClick = () => {}) => {
    return Object.keys(items)
        .map((key) => (
            <li title={ items[key] }
                    data-value={ key }
                    onClick={ () => {
                        onClick({ target: { name, value: key } });
                    } }>
                { items[key] }
            </li>
        ));
}

const DropDown = ({ name, items, onChange, dropdownClass = 'dropdown-menu select' }) => (
    <ul className={ dropdownClass }>
        { renderItems(name, items, onChange) }
    </ul>
);

const AutoComplete = formContext(changeable(({ name, open, items, value, onChange = () => {}, onOpen, onClose }) => (
    <div className={ classnames('dropdown custom', { open }) }>
        <input type="text"
                name={ name }
                value={ items[value] || value }
                onKeyDown={ onOpen }
                onChange={ onChange }
                className="form-control" />
        <DropDown name={ name }
                items={ items }
                onChange={ (ev) => {
                    if (items[ev.target.value]) {
                        onClose();
                    }
                    onChange(ev);
                } } />
    </div>
)));
export default AutoComplete;

export class StateControlledAutoComplete extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onOpen(ev) {
        this.setState({ open: true });
    }

    onClose(ev) {
        this.setState({ open: false });
    }

    render() {
        return (
            <AutoComplete open={ this.state.open }
                    onOpen={ this.onOpen }
                    onClose={ this.onClose }
                    { ...this.props } />
        );
    }
}
