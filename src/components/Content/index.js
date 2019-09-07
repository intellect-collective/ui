import React from 'react';
import PropTypes from 'prop-types';
import { classify, html_props } from '../utils';

const Content = ({ children, ...rest }) => (
    <div className={ classify(rest) } { ...html_props(rest) }>
        { children }
    </div>
);
Content.displayName = 'Content';
Content.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
Content.defaultProps = {
	className: 'content'
};
export default Content;
