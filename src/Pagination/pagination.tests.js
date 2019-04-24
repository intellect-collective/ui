import React from 'react';
import {
    Pagination
} from '../..';

describe('Pagination', () => {
    it('Can display', () => {
        const wrapper = mount(
            <Pagination page="3"
                    pageSize="25"
                    rows="214"
                    buffer="5" />
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('Can change buffer size', () => {
        const wrapper = mount(
            <Pagination page="4"
                    pageSize="25"
                    rows="214"
                    buffer="3" />
        );
        expect(wrapper.find('a').length).toEqual(11);
    });
    it('Disables first button', () => {
        const wrapper = mount(
            <Pagination page="1"
                    pageSize="25"
                    rows="214"
                    buffer="3" />
        );
        expect(wrapper.find('li').at(0).hasClass('disabled')).toBe(true);
        expect(wrapper.find('li').at(1).hasClass('disabled')).toBe(true);
    });
    it('Disables last button', () => {
        const wrapper = mount(
            <Pagination page="9"
                    pageSize="25"
                    rows="214"
                    buffer="3" />
        );
        expect(wrapper.find('li').at(6).hasClass('disabled')).toBe(true);
        expect(wrapper.find('li').at(7).hasClass('disabled')).toBe(true);
    });
    it('Item click calls page change handler', () => {
        const fn = jest.fn();
        const wrapper = mount(
            <Pagination page="9"
                    pageSize="25"
                    rows="214"
                    buffer="3"
                    onPageChange={ fn } />
        );
        wrapper.find('a').at(1).simulate('click');
        expect(fn.mock.calls.length).toBe(1);
        expect(fn).toBeCalledWith(8, 25, expect.anything());
    });
    it('No-op page change', () => {
        const wrapper = mount(
            <Pagination page="9"
                    pageSize="25"
                    rows="214"
                    buffer="3" />
        );
        // Should not cause error
        wrapper.find('a').at(1).simulate('click');
    });
});
