import React from 'react';
import PropTypes from 'prop-types';
import withContext from '../utils/withContext';
import { AccordionItemContext } from '../AccordionItem';

const AccordionItemBody = ({ context, ...rest }) => (
    <dd aria-hidden={ !context.expanded }
            aria-labelledby={ `${ context.id }-title` }
            role="region"
            { ...rest } />
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
