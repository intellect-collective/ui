import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from '../_decorators/_utils';
import formContext from '../_decorators/formContext';
import changeable from '../_decorators/changeable';
import { normalizeItems } from '../utils';

const noop = () => {};

const KEY_HANDLERS = {
    ArrowDown(ev) {
        ev.preventDefault();
        const { highlightedIndex = -1 } = this.props;
        const items = this.getItems();
        if (highlightedIndex < items.length - 1) {
            this.onHighlight(ev, highlightedIndex + 1);
        } else {
            this.onHighlight(ev, 0);
        }
    },
    ArrowUp(ev) {
        ev.preventDefault();
        const { highlightedIndex } = this.props;
        if (typeof highlightedIndex === 'undefined'
                || highlightedIndex === 0) {
            this.onHighlight(ev, this.props.items.length - 1);
        } else {
            this.onHighlight(ev, highlightedIndex - 1);
        }
    },
    Enter(ev) {
        // Key code 229 used for char selectors
        if (ev.keyCode !== 13) {
            return;
        }

        if (!this.props.open) {
            return;
        }

        // Input has focus but no menu item is selected. Close the menu, accept
        // whatever's in input
        if (typeof this.props.highlightedIndex === 'undefined'
                || this.props.highlightedIndex === null) {
            ev.preventDefault();
            this.props.onClose(ev);
            return;
        }

        // Text entered + menu item highlighted
        ev.preventDefault();
        this.onSelect(ev);
    },
    Escape(ev) {
        ev.preventDefault();
        this.props.onClose(ev);
    },
    Tab(ev) {
        this.props.onClose(ev);
    }
};

export class AutoCompleteInner extends React.Component {
    static propTypes = {
        /**
         * The id of the control, as used in the `id` and ARIA HTML
         * attributes.
         */
        id: PropTypes.string,
        /**
         * The name of the field, as used in the `name` HTML attribute as well
         * as form context objects
         */
        name: PropTypes.string.isRequired,
        /**
         * The value to display in the input field
         */
        value: PropTypes.any,
        /**
         * The items to display in the dropdown menu
         */
        items: PropTypes.array.isRequired,
        /**
         * The maximum number of items to display in the dropdown. If more than
         * this number are provided, the remaining items are ignored.
         */
        max: PropTypes.number,
        /**
         * A number indicating the position in the list of items to highlight in
         * the list box.
         */
        highlightedIndex: PropTypes.number,
        /**
         * Arguments: ``
         *
         * Invoked when the list should be opened.
         */
        onOpen: PropTypes.func,
        /**
         * Arguments: ``
         *
         * Invoked when the list should be closed.
         */
        onClose: PropTypes.func,
        /**
         * Arguments: `event: Event, value: String`
         *
         * Invoked every time the user changes the input's value.
         */
        onChange: PropTypes.func,
        /**
         * Arguments: ``
         *
         * Invoked when the currently highlighted item in the list should
         * change.
         */
        onHighlight: PropTypes.func,
        /**
         * Arguments: `value: String, item: Any`
         *
         * Invoked when the user selects an item from the dropdown menu.
         */
        onSelect: PropTypes.func,
        /**
         * Used to override the internal logic which displays/hides the dropdown
         * menu. This is useful if you want to force a certain state based on your
         * UX/business logic. Use it together with `onMenuVisibilityChange` for
         * fine-grained control over the dropdown menu dynamics.
         */
        open: PropTypes.bool
    };

    static defaultProps = {
        max: 10,
        value: '',
        onOpen: noop,
        onClose: noop,
        onHighlight: noop,
        onChange: noop,
        onSelect: noop
    };

    constructor(props) {
        super(props);

        this.id = props.id || Math.random().toString(36).substring(7);

        this.getItems = this.getItems.bind(this);
        this.setIgnoreBlur = this.setIgnoreBlur.bind(this);
        this.normalizeEvent = this.normalizeEvent.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onHighlight = this.onHighlight.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
    }

    //
    // Helpers and Utilities
    //
    getItems() {
        return normalizeItems(this.props.items)
            .slice(0, this.props.max);
    }

    setIgnoreBlur(ignore) {
        this._ignoreBlur = ignore;
    }

    normalizeEvent(ev, i) {
        let index = i;
        if (typeof index === 'undefined' && ev.target.attributes['data-index']) {
            index = Number(ev.target.attributes['data-index'].value);
        }
        if (typeof index === 'undefined') {
            index = this.props.highlightedIndex;
        }
        return {
            preventDefault: ev.preventDefault,
            target: {
                name: this.props.name,
                value: this.getItems()[index].value,
                index
            }
        };
    }

    //
    // User Event Handlers
    //

    onFocus(ev) {
        this.props.onOpen(ev);
    }

    onBlur(ev) {
        if (!this._ignoreBlur) {
            this.props.onClose(ev);
        }
    }

    onHighlight(ev, i) {
        this.props.onHighlight(this.normalizeEvent(ev, i));
    }

    onSelect(ev) {
        this.props.onSelect(this.normalizeEvent(ev));
    }

    onKeyDown(ev) {
        if (KEY_HANDLERS[ev.key]) {
            KEY_HANDLERS[ev.key].call(this, ev);
        } else if (!this.props.open) {
            this.props.onOpen(ev);
        }
    }

    //
    // Rendering Methods
    //
    renderItems() {
        return this.getItems()
            .map(({ title }, i) => (
                <li id={ `${ this.id }-result-${ i }` }
                        title={ title }
                        key={ title }
                        role="option"
                        aria-selected={ this.props.highlightedIndex === i }
                        className={ classnames({ highlight: this.props.highlightedIndex === i }) }
                        onMouseEnter={ this.onHighlight }
                        onClick={ this.onSelect }
                        onKeyDown={ noop }
                        data-index={ i }>
                    { title }
                </li>
            ));
    }

    renderMenu() {
        return (
            <ul id={ `${ this.id }-list` }
                    role="listbox"
                    aria-labelledby={ this.id }
                    className="autocomplete-list"
                    onMouseEnter={ () => (this.setIgnoreBlur(true)) }
                    onMouseLeave={ () => (this.setIgnoreBlur(false)) }>
                { this.renderItems() }
            </ul>
        );
    }

    render() {
        const {
            value,
            open
        } = this.props;
        return (
            <div className={ classnames('autocomplete', { open }) }>
                <input id={ this.id }
                        name={ this.props.name }
                        type="text"
                        value={ value }
                        role="combobox"
                        aria-autocomplete="list"
                        aria-controls={ `${ this.id }-list` }
                        aria-expanded={ open }
                        aria-activedescendant={ typeof this.props.highlightedIndex !== 'undefined' ? `${ this.id }-result-${ this.props.highlightedIndex }` : undefined }
                        autoComplete="off"
                        ref={ (el) => { this.input = el; } }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur }
                        onChange={ this.props.onChange }
                        onKeyDown={ this.onKeyDown } />
                { this.renderMenu() }
            </div>
        );
    }
}

export default compose(
    formContext(),
    changeable()
)(AutoCompleteInner);
