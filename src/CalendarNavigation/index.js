import React from 'react';
import PropTypes from 'prop-types';
import {
    addMonths,
    format,
    isSameMonth,
    subMonths
} from 'date-fns';

const noop = () => {};

const Navigation = ({ month, onMonthChange = noop }) => (
    <div className="calendar-navigation fc-toolbar fc-header-toolbar">
        <div className="calendar-navigation-left">
            <div className="calendar-button-group">
                <button type="button" className="double" aria-label="prev" onClick={ () => { onMonthChange(subMonths(month, 1)); } }>&#x2039;</button>
                <button type="button" className="double" aria-label="next" onClick={ () => { onMonthChange(addMonths(month, 1)); } }>&#x203A;</button>
                <button type="button" aria-label="today" disabled={ isSameMonth(month, new Date(Date.now())) } onClick={ () => { onMonthChange(new Date(Date.now())); } }>Today</button>
            </div>
        </div>
        <div className="calendar-navigation-center">
            <h2>{ format(month, 'MMM - YYYY') }</h2>
        </div>
        <div className="fc-clear" />
    </div>
);
Navigation.propTypes = {
    month: PropTypes.instanceOf(Date),
    onMonthChange: PropTypes.func
};
export default Navigation;
