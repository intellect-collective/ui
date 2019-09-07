import React from 'react';
import PropTypes from 'prop-types';
import { classify } from '../utils';

const Footer = ({ children, ...rest }) => (
    <div className={ classify(rest) }>
        { children }
    </div>
);
Footer.displayName = 'Footer';
Footer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
Footer.defaultProps = {
	className: 'footer'
};
export default Footer;
