import React from 'react';
import {
    addDays,
    endOfWeek,
    startOfDay
} from 'date-fns';
import { Calendar } from '../../../..';

const MONTH = new Date('2014-02-11T00:00:00.000Z');
const CURRENT = new Date('2014-03-14T00:00:00.000Z');
const CALENDARS = [
    {
        id: 1,
        title: 'My Schedule',
        background: '#EDD197',
        color: 'black',
        hidden: false
    },
    {
        id: 2,
        title: 'Patient Schedule',
        background: '#B0D80A',
        hidden: false
    },
    {
        id: 3,
        title: 'World Events',
        background: '#dc2127',
        hidden: false
    }
];
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

describe('Calendar', () => {
    const now = { Date };
    beforeEach(() => {
        Date.now = jest.fn(() => (CURRENT.getTime()));
    });
    afterEach(() => {
        Date.now = now;
    });
    it('Can set month', () => {
        const wrapper = mount(<Calendar month={ MONTH } />);
        expect(wrapper.find('h2').text()).toEqual('Feb - 2014');
    });
    it('Can change month', () => {
        const fn = jest.fn();
        const wrapper = mount(<Calendar month={ MONTH } onMonthChange={ fn } />);
        expect(wrapper).toMatchSnapshot();

        // Test back
        wrapper.find('button[aria-label="prev"]').simulate('click');
        expect(fn).toHaveBeenLastCalledWith(new Date('2014-01-11T00:00:00.000Z'));

        // Test forward
        wrapper.find('button[aria-label="next"]').simulate('click');
        expect(fn).toHaveBeenLastCalledWith(new Date('2014-03-11T00:00:00.000Z'));
    });
    it('Can pass calendar list', () => {
        const wrapper = mount(<Calendar calendars={ CALENDARS } />);
        expect(wrapper.find('.calendar-list li')).toHaveLength(4);
    });
    it('Can pass event list', () => {
        const wrapper = mount(
            <Calendar calendars={ CALENDARS }
                    events={ EVENTS }
                    month={ MONTH } />
        );
        expect(wrapper.find('.calendar-event')).toHaveLength(7);
    });
});
