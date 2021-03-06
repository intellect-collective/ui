import React from 'react';
import update from 'immutability-helper';
import { storiesOf } from '@storybook/react';
import {
    addDays,
    addWeeks,
    differenceInDays,
    endOfWeek,
    setHours,
    startOfDay,
    startOfMonth,
    subDays
} from 'date-fns';
import stateful from '../../../../.storybook/decorators/stateful';
import Calendar from './index';

const now = new Date();

const calendars = [
    {
        id: 1,
        title: 'My Schedule',
        background: '#EDD197',
        color: 'black'
    },
    {
        id: 2,
        title: 'Patient Schedule',
        background: '#B0D80A'
    },
    {
        id: 3,
        title: 'World Events',
        background: '#dc2127'
    }
];
const events = [
    {
        id: 1,
        title: 'Jordan\'s Birthday',
        start: startOfDay(now),
        allday: true,
        calendar: 1
    },
    {
        id: 2,
        title: 'Festival of Fridolan',
        start: startOfDay(addDays(now, 1)),
        end: endOfWeek(addDays(now, 1)),
        allday: true,
        calendar: 3
    },
    {
        id: 3,
        title: 'Brenda on Vacation',
        start: startOfDay(now),
        end: addWeeks(now, 1),
        allday: true,
        calendar: 1
    },
    {
        id: 4,
        title: 'Doctor\'s appointment',
        start: setHours(addDays(now, 1), 14),
        calendar: 1
    },
    {
        id: 5,
        title: 'Dentist appointment',
        start: subDays(startOfMonth(now), 1),
        allday: true,
        calendar: 1
    },
    {
        id: 6,
        title: 'Water Rights Conference',
        start: addDays(now, 1),
        end: addDays(now, 2),
        calendar: 2
    }
];

storiesOf('Molecules / Calendar / Calendar', module)
    .addDecorator(stateful({ calendars, events, month: new Date() }))
    .add('default', () => (onChange, state, stateful) => (
        <Calendar { ...state }
                onCalendarVisibilityStateChange={ (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    const idx = state.calendars.findIndex((c) => (
                        c.id === Number(ev.target.value)
                    ));
                    const updated = update(state.calendars, {
                        [idx]: { hidden: { $set: !ev.target.checked } }
                    });
                    stateful.setState({ calendars: updated });
                } }
                onDrop={ (ev, date) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    const id = ev.dataTransfer.getData('id');
                    const idx = state.events.findIndex((c) => (c.id === Number(id)));
                    let event = state.events[idx];

                    const diff = differenceInDays(date, event.start);
                    if (event.start) {
                        event = update(event, { start: { $set: addDays(event.start, diff) } });
                    }
                    if (event.end) {
                        event = update(event, { end: { $set: addDays(event.end, diff) } });
                    }
                    const updated = update(state.events, { [idx]: { $set: event } });
                    stateful.setState({ events: updated });
                } }
                onMonthChange={ (month) => {
                    stateful.setState({ month });
                } } />
    ));
