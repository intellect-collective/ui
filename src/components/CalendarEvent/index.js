import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format, isSameDay, startOfWeek } from 'date-fns';

const style = (event) => {
    const result = {};
    if (event.background) {
        result.background = event.background;
    }
    if (event.color) {
        result.color = event.color;
    }
    return result;
};

const Event = ({ day, event, index }) => {
    const start = isSameDay(event.start, day);
    const end = isSameDay(event.end || event.start, day);
    const split = index === 6 && !end;

    let time;
    if (!event.allday && (start || isSameDay(day, startOfWeek(day)))) {
        time = format(event.start, 'ha');
        time = time.substr(time, time.length - 1);
        time = (<strong>{ time }</strong>);
    }
    let title = (<span>&nbsp;</span>);
    if (start || isSameDay(day, startOfWeek(day))) {
        title = (
            <span className="calendar-event-title">{ time } { event.title }</span>
        );
    }
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
        <a className={ clsx('calendar-event draggable', {
            start,
            end,
            split
        }) }
                style={ style(event) }
                draggable
                onDragStart={ (ev) => {
                    ev.dataTransfer.setData('id', event.id);
                } }
                role="presentation">
            <div className="calendar-content">{ title }</div>
        </a>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid */
};
Event.displayName = 'Event';
Event.propTypes = {
    day: PropTypes.instanceOf(Date),
    index: PropTypes.number,
    event: PropTypes.object
};

export default Event;
