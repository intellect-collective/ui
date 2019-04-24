import React from 'react';
import PropTypes from 'prop-types';
import { AccordionContext } from '../Accordion';
import Fragment from '../Fragment';
import withContext from '../utils/withContext';

export const AccordionItemContext = React.createContext();

export class AccordionItemInner extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.node,
        context: PropTypes.shape({
            id: PropTypes.string,
            expanded: PropTypes.arrayOf(PropTypes.string),
            addItem: PropTypes.func,
            setItemVisibility: PropTypes.func,
            removeItem: PropTypes.func
        })
    };

    constructor(props) {
        super(props);

        this.id = props.id || Math.random().toString(36).substring(7);
        if (props.context) {
            props.context.addItem(this.id);
        }

        this.getContext = this.getContext.bind(this);
    }

    componentWillUnmount() {
        if (this.props.context) {
            this.props.context.removeItem(this.id);
        }
    }

    getContext() {
        const { context } = this.props;
        if (!context) {
            return {};
        }
        return {
            expanded: context.expanded.indexOf(this.id) !== -1,
            setItemVisibility: context.setItemVisibility,
            openOnFocus: context.openOnFocus
        };
    }

    render() {
        const ctx = {
            id: this.id,
            ...this.getContext()
        };

        return (
            <AccordionItemContext.Provider value={ ctx }>
                <Fragment>
                    { this.props.children }
                </Fragment>
            </AccordionItemContext.Provider>
        );
    }
}

export default withContext(AccordionContext)(AccordionItemInner);
