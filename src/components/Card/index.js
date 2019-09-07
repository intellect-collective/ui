import React from 'react';
import PropTypes from 'prop-types';
import Content from '../Content';
import { classify, slot, html_props } from '../utils';

const Card = ({ children, ...rest }) => {
    const content = slot(children, (c) => (c.type.name !== 'Underlay'));
    const underlay = slot(children, (c) => (c.type.name === 'Underlay'));
    let additional_classes = [];
    if (underlay && underlay.length) {
        additional_classes.push('underlaid');
        additional_classes.push(`underlay-${ underlay[0].props.position }`);
    }
	return (
	    <div className={ classify(rest, additional_classes) } { ...html_props(rest) }>
            <div className="inner">
                { content }
            </div>
            { underlay }
	    </div>
    );
};
Card.displayName = 'Card';
Card.propTypes = {
	/**
	 * An optional title to give the card, which will be placed inside a header.
	 */
    title: PropTypes.string,
    /**
     * The child components to be displayed inside the card.
     */
    children: PropTypes.node,
    /**
     * The class name to give the card
     */
    className: PropTypes.string,
};
Card.defaultProps = {
	className: 'card'
};
export default Card;
