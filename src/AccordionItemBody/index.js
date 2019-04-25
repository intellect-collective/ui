import React from 'react';
import PropTypes from 'prop-types';
import withContext from '../utils/withContext';
import { AccordionItemContext } from '../AccordionItem';
import Collapsible from '../Collapsible';

const AccordionItemBody = ({ children, context, ...rest }) => (
    <Collapsible component="dd"
            aria-hidden={ !context.expanded }
            aria-labelledby={ `${ context.id }-title` }
            role="region"
            open={ context.expanded }
            { ...rest }>
        <div>{ children }</div>
    </Collapsible>
);
AccordionItemBody.displayName = 'AccordionItemBody';
AccordionItemBody.propTypes = {
    expanded: PropTypes.bool,
    context: PropTypes.shape({
        id: PropTypes.string,
        expanded: PropTypes.bool
    })
};
AccordionItemBody.defaultProps = {
    context: {}
};

export default withContext(AccordionItemContext)(AccordionItemBody);
