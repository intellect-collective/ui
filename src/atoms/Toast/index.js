import React from 'react';
import classnames from 'classnames';
import { formatDistance } from 'date-fns';

const Toast = ({ title, time, children, onClose, show }) => (
    <div role="alert" aria-live="assertive" aria-atomic="true" className={ classnames('toast', { show }) }>
        <div className="toast-header">
            { title && (
                <span className="title">{ title }</span>
            ) }

            { time && (
                <small>{ formatDistance(time, new Date()) }</small>
            ) }

            { onClose && (
                <button className="close" onClick={ onClose }><span aria-hidden="true">&times;</span></button>
            ) }
            
        </div>
        <div className="toast-body">
            { children }
        </div>
    </div>
);

export default Toast;