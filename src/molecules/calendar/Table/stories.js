import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    addDays,
    addWeeks,
    endOfWeek,
    setHours,
    startOfDay,
    startOfMonth,
    subDays
} from 'date-fns';
import Table from './index';

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

storiesOf('Molecules / Calendar / Table', module)
    .add('default', () => (<Table events={ events } calendars={ calendars } />));
