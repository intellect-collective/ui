import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import last from 'lodash/last';
import orderBy from 'lodash/orderBy';
import pull from 'lodash/pull';
import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isBefore,
    isSameDay,
    startOfMonth,
    startOfWeek
} from 'date-fns';
import EventContainer from '../CalendarEventContainer';
import './calendartable.scss';

const FORMAT = 'yyyyMMdd';

const normalize = (events, calendars) => {
    if (!events || events.length === 0) {
        return [];
    }

    if (calendars && calendars.length > 0) {
        events = events.filter((e) => ( // eslint-disable-line no-param-reassign
            !e.calendar
            || !(find(calendars, ['id', e.calendar]) || {}).hidden
        ));
    }

    if (events.length === 0) {
        return [];
    }

    events = events.map((event) => { // eslint-disable-line no-param-reassign
        const result = { ...event };
        if (event.calendar) {
            const calendar = find(calendars, { id: event.calendar });
            if (calendar) {
                const { background, color } = calendar;
                Object.assign(result, { background, color });
            }
        }
        return result;
    });

    const startOrdered = orderBy(events, (o) => (format(o.start, FORMAT)));
    const startGrouped = groupBy(startOrdered, (o) => (format(o.start, FORMAT)));
    const endOrdered = orderBy(events, (o) => (format(o.end || o.start, FORMAT)));
    const endGrouped = groupBy(endOrdered, (o) => (format(o.end || o.start, FORMAT)));
    let current = startOrdered[0].start;
    let end = last(endOrdered);
    end = end.end || end.start;

    // Iterate over each event in chronological order, and assign positional
    // indicators that are reused as they become available
    let positionHeight = 0;
    const availablePositions = [];
    const getPosition = () => {
        if (availablePositions.length > 0) {
            const result = Math.min.apply(null, availablePositions);
            pull(availablePositions, result);
            return result;
        }
        const result = positionHeight;
        positionHeight++;
        return result;
    };

    // Iterate by day
    do {
        // Assign positions to new events
        const starts = startGrouped[format(current, FORMAT)] || [];
        starts.forEach((event) => {
            if (!event.position) {
                event.position = getPosition(event); // eslint-disable-line no-param-reassign
            }
        });

        // Now release positions
        const ends = endGrouped[format(current, FORMAT)] || [];
        ends.forEach((event) => {
            availablePositions.push(event.position);
        });

        // Advance by one day and go again
        current = addDays(current, 1);
    } while (isSameDay(current, end) || isBefore(current, end));

    return events;
};

const getWeekdays = () => {
    const now = new Date();
    const arr = eachDayOfInterval({ start: startOfWeek(now), end: endOfWeek(now) });
    return arr.reduce((a, d) => {
        a.push(format(d, 'EEE'));
        return a;
    }, []);
};

const CalendarTable = ({
    month, selected, events, calendars = [], onDrop, onCellClick
}) => {
    // The following `new Date(Date.now())` is gross, but necessary for test
    // mocking. Would like to find another way
    const current = new Date(Date.now());
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const normalizedEvents = normalize(events, calendars);

    const rows = [];
    let day = startDate;
    let j = 0;

    while (day <= endDate) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(
                <EventContainer current={ current }
                        monthStart={ monthStart }
                        selected={ selected }
                        monthEnd={ monthEnd }
                        day={ day }
                        events={ normalizedEvents }
                        onDrop={ onDrop }
                        onClick={ onCellClick }
                        index={ i }
                        key={ i } />
            );
            day = addDays(day, 1);
        }
        rows.push(
            <tr key={ j }>
                { days }
            </tr>
        );
        j++;
    }

    return (
        <table className="calendar">
            <thead>
                <tr>
                    {
                        getWeekdays().map((o) => (
                            <th key={ o }>{ o }</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    );
};
CalendarTable.displayName = 'CalendarTable';
CalendarTable.propTypes = {
    month: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        allday: PropTypes.boolean
    })),
    calendars: PropTypes.arrayOf(PropTypes.object),
    onCellClick: PropTypes.func,
    onDrop: PropTypes.func
};
CalendarTable.defaultProps = {
    month: new Date()
};

export default CalendarTable;
