import React from 'react';
import PropTypes from 'prop-types';
import withContext from '../utils/withContext';
import { AccordionItemContext } from '../AccordionItem';

class AccordionItemTitle extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        context: PropTypes.shape({
            id: PropTypes.string,
            expanded: PropTypes.bool
        })
    };

    static defaultProps = {
        context: {}
    };

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleMouseDown() {
        const { context } = this.props;
        if (context.setItemVisibility) {
            context.setItemVisibility(context.id, !context.expanded);
        }
    }

    handleFocus() {
        const { context } = this.props;
        if (context && context.openOnFocus && !context.expanded) {
            context.setItemVisibility(context.id, true);
        }
    }

    render() {
        const {
            children,
            context
        } = this.props;

        return (
            <dt role="heading">
                <button id={ `${ context.id }-title` }
                        type="button"
                        aria-controls={ `${ context.id }-body` }
                        aria-expanded={ context.expanded }
                        onMouseDown={ this.handleMouseDown }
                        onFocus={ this.handleFocus }>
                    <h5>{ children }</h5>
                    <i className="accordion-icon" />
                </button>
            </dt>
        );
    }
}

export default withContext(AccordionItemContext)(AccordionItemTitle);
