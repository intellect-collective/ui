import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CalendarListItem from '../CalendarListItem';

const CalendarList = ({ calendars = [], onChange = () => {} }) => (
    <ul className="calendar-list">
        <li className="item-header">Calendars</li>
        {
            calendars.map((calendar) => (
                <CalendarListItem onChange={ onChange }
                        calendar={ calendar }
                        hidden={ calendar.hidden }
                        key={ calendar.id } />
            ))
        }
    </ul>
);
CalendarList.displayName = 'CalendarList';
CalendarList.propTypes = {
    calendars: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
};

export default CalendarList;
