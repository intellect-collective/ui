import React from 'react';
import PropTypes from 'prop-types';
import { classify } from '../utils';

const style = ({ width, height }) => ({
    width: `${ width }`,
    height: `${ height }`
});

const Underlay = ({ children, ...rest }) => {
	return (
	    <div className={ classify(rest) } style={ style(rest) }>
	    	{ children }
	    </div>
    );
};
Underlay.displayName = 'Underlay';
Underlay.propTypes = {
    /**
     * The child components to be displayed inside the underlay.
     */
    children: PropTypes.node,
    /**
     * The class name to give the underlay
     */
    className: PropTypes.string,
    /**
     * The width, in percent (%) of the underlay compared to the parent element.
     */
    width: PropTypes.number,
    /**
     * The height, in percent (%) of the underlay compared to the parent
     * element.
     */
    height: PropTypes.number,
    /**
     * The position at which to display the underlay.
     */
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};
Underlay.defaultProps = {
	className: 'underlay'
};
export default Underlay;
