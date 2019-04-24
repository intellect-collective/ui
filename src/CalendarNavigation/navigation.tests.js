import React from 'react';
import { CalendarNavigation } from '../..';

const MONTH = new Date('2014-02-11T00:00:00.000Z');
const CURRENT = new Date('2014-03-14T00:00:00.000Z');

describe('Navigation', () => {
    const now = { Date };
    let fn;
    let wrapper;
    beforeEach(() => {
        global.Date.now = jest.fn(() => (CURRENT.getTime()));
        fn = jest.fn();

        wrapper = mount(<CalendarNavigation month={ MONTH } onMonthChange={ fn } />);
    });
    afterEach(() => {
        global.Date.now = now;
    });
    it('Can go back a month', () => {
        wrapper.find('button[aria-label="prev"]').simulate('click');
        expect(fn).toHaveBeenLastCalledWith(new Date('2014-01-11T00:00:00.000Z'));
    });
    it('Can go forward a month', () => {
        wrapper.find('button[aria-label="next"]').simulate('click');
        expect(fn).toHaveBeenLastCalledWith(new Date('2014-03-11T00:00:00.000Z'));
    });
    it('Can go to today', () => {
        wrapper.find('button[aria-label="today"]').simulate('click');
        expect(fn).toHaveBeenLastCalledWith(new Date('2014-03-14T00:00:00.000Z'));
    });
    it('Defaults to no-op handler', () => {
        wrapper = mount(<CalendarNavigation month={ MONTH } />);
        wrapper.find('button[aria-label="today"]').simulate('click');
        expect(fn).not.toHaveBeenCalled();
    });
});
