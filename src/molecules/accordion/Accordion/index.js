import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const AccordionContext = React.createContext();

export default class Accordion extends React.Component {
    static propTypes = {
        openOnFocus: PropTypes.bool,
        openFirst: PropTypes.bool,
        openMultiple: PropTypes.bool,
        className: PropTypes.string
    };

    constructor() {
        super();

        this.state = {
            items: [],
            expanded: []
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.setItemVisibility = this.setItemVisibility.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.expanded !== nextState.expanded
                || this.state.items !== nextState.items
                || this.props.className !== nextProps.className;
    }

    addItem(id) {
        this.setState((prevState) => {
            const items = Array.prototype.slice.apply(prevState.items);
            if (items.indexOf(id) === -1) {
                items.push(id);
            }
            let { expanded } = prevState;
            if ((!expanded || expanded.length === 0) && this.props.openFirst) {
                expanded = [items[0]];
            }
            return {
                expanded,
                items
            };
        });
    }

    removeItem(id) {
        this.setState((prevState) => ({
            items: prevState.items.filter((i) => (i !== id))
        }));
    }

    setItemVisibility(id, visibility) {
        this.setState((prevState) => {
            if (!visibility) {
                return { expanded: prevState.expanded.filter((i) => (i !== id)) };
            }
            if (this.props.openMultiple) {
                return {
                    expanded: [...prevState.expanded].concat([id])
                };
            }
            return { expanded: [id] };
        });
    }

    render() {
        const {
            className,
            openFirst,
            openOnFocus,
            openMultiple,
            ...rest
        } = this.props;
        const ctx = {
            addItem: this.addItem,
            removeItem: this.removeItem,
            setItemVisibility: this.setItemVisibility,
            expanded: this.state.expanded,
            openFirst,
            openOnFocus
        };
        const classes = classnames('accordion', className);

        return (
            <AccordionContext.Provider value={ ctx }>
                <dl role="presentation" className={ classes } { ...rest } />
            </AccordionContext.Provider>
        );
    }
}
