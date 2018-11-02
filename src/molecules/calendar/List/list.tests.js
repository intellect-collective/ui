import React from 'react';
import { CalendarList } from '../../../..';

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
        hidden: false
    },
    {
        id: 3,
        title: 'World Events',
        background: '#dc2127',
        hidden: false
    }
];

describe('List', () => {
    let fn;
    let wrapper;
    beforeEach(() => {
        fn = jest.fn();
        wrapper = mount(<CalendarList calendars={ CALENDARS } onChange={ fn } />);
    });
    it('Can click checkbox', () => {
        expect(wrapper).toMatchSnapshot();
        wrapper.find('input[type="checkbox"]').first().simulate('change');
        expect(fn).toHaveBeenLastCalledWith(expect.objectContaining({
            target: expect.anything()
        }));
    });
    it('Supports no-op handler', () => {
        wrapper = mount(<CalendarList calendars={ CALENDARS } />);
        wrapper.find('input[type="checkbox"]').first().simulate('change');
        expect(fn).not.toHaveBeenCalled();
    });
});
