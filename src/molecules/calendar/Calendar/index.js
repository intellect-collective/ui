import React from 'react';
import PropTypes from 'prop-types';
import CalendarNavigation from '../../../atoms/calendar/Navigation';
import CalendarList from '../List';
import CalendarTable from '../Table';

const Calendar = ({
    month,
    calendars,
    events,
    onCalendarVisibilityStateChange,
    onMonthChange,
    onDrop
}) => (
    <div className="calendar-wrapper">
        <div className="calendar-navigation-wrapper">
            <CalendarNavigation month={ month }
                    onMonthChange={ onMonthChange } />
        </div>
        <div className="calendar-lower-wrapper">
            <div className="calendar-list-wrapper">
                <CalendarList calendars={ calendars }
                        onChange={ onCalendarVisibilityStateChange } />
            </div>
            <div className="calendar-table-wrapper">
                <CalendarTable month={ month }
                        calendars={ calendars }
                        events={ events }
                        onDrop={ onDrop } />
            </div>
        </div>
    </div>
);
Calendar.propTypes = {
    onDrop: PropTypes.func,
    onMonthChange: PropTypes.func,
    onCalendarVisibilityStateChange: PropTypes.func,
    events: PropTypes.arrayOf(PropTypes.object),
    calendars: PropTypes.arrayOf(PropTypes.object),
    month: PropTypes.instanceOf(Date)
};
Calendar.defaultProps = {
    month: new Date()
};
export default Calendar;
