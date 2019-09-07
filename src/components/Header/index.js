import React from 'react';
import PropTypes from 'prop-types';
import { classify } from '../utils';

const Header = ({ title, children, ...rest }) => (
    <div className={ classify(rest) }>
        <h5>{ title }</h5>
        { children }
    </div>
);
Header.displayName = 'Header';
Header.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string.isRequired
};
Header.defaultProps = {
	className: 'header'
};
export default Header;
