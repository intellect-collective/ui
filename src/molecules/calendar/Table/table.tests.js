import React from 'react';
import {
    addDays,
    endOfWeek,
    startOfDay
} from 'date-fns';
import { CalendarTable } from '../../../..';

const MONTH = new Date('2014-02-11T00:00:00.000Z');
const CURRENT = new Date('2014-03-14T00:00:00.000Z');
const EVENTS = [
    {
        id: 1,
        title: 'Festival of Fridolan',
        start: startOfDay(MONTH),
        end: endOfWeek(MONTH),
        allday: true,
        calendar: 3
    },
    {
        id: 2,
        title: 'Water Rights Conference',
        start: addDays(MONTH, 1),
        end: addDays(MONTH, 2),
        calendar: 1
    }
];

describe('Table', () => {
    const now = { Date };
    beforeEach(() => {
        Date.now = jest.fn(() => (CURRENT.getTime()));
    });
    afterEach(() => {
        Date.now = now;
    });
    it('Can be empty', () => {
        const wrapper = mount(<CalendarTable />);
        expect(wrapper.find('.calendar-event')).toHaveLength(0);
    });
    it('Can accept event list without calendar list', () => {
        const wrapper = mount(<CalendarTable month={ MONTH } events={ EVENTS } />);
        expect(wrapper.find('.calendar-event')).toHaveLength(7);
    });
    it('Calendar list can filter visible events to zero', () => {
        const calendars = [
            {
                id: 1,
                hidden: true
            },
            {
                id: 3,
                hidden: true
            }
        ];
        const wrapper = mount(
            <CalendarTable month={ MONTH }
                    events={ EVENTS }
                    calendars={ calendars } />
        );
        expect(wrapper.find('.calendar-event')).toHaveLength(0);
    });
    it('Event referring to invalid calendar won\'t break', () => {
        const calendars = [
            {
                id: 1
            }
        ];
        const wrapper = mount(
            <CalendarTable month={ MONTH }
                    events={ EVENTS }
                    calendars={ calendars } />
        );
        expect(wrapper.find('.calendar-event')).toHaveLength(7);
    });
    it('Event spacing works', () => {
        const events = [
            {
                id: 1,
                title: 'Festival of Fridolan',
                start: startOfDay(MONTH),
                end: endOfWeek(MONTH),
                allday: true,
                position: 1
            },
            {
                id: 2,
                title: 'Brenda\'s birthday',
                start: startOfDay(addDays(MONTH, 1)),
                allday: true,
                position: 2
            },
            {
                id: 3,
                title: 'Water Rights Conference',
                start: startOfDay(MONTH),
                end: endOfWeek(MONTH),
                position: 3
            }
        ];
        const wrapper = mount(<CalendarTable month={ MONTH } events={ events } />);
        expect(wrapper.find('.calendar-spacer')).toHaveLength(9);
    });
});
