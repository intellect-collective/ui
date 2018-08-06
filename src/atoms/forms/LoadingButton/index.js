import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LoadingButton = ({
    loading, className, children, ...props
}) => (
    <button { ...props }
            disabled={ Boolean(loading) }
            className={ classnames('btn-loader', className, { loading: Boolean(loading) }) }>
        <span className="btn-loader-label">{ children }</span>
        <span className="btn-loader-spinner">
            <div className="sk-spinner sk-spinner-fading-circle">
                <div className="sk-circle1 sk-circle" />
                <div className="sk-circle2 sk-circle" />
                <div className="sk-circle3 sk-circle" />
                <div className="sk-circle4 sk-circle" />
                <div className="sk-circle5 sk-circle" />
                <div className="sk-circle6 sk-circle" />
                <div className="sk-circle7 sk-circle" />
                <div className="sk-circle8 sk-circle" />
                <div className="sk-circle9 sk-circle" />
                <div className="sk-circle10 sk-circle" />
                <div className="sk-circle11 sk-circle" />
                <div className="sk-circle12 sk-circle" />
            </div>
        </span>
    </button>
);
LoadingButton.displayName = 'LoadingButton';
LoadingButton.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string
};

export default LoadingButton;
