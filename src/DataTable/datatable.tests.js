import React from 'react';
import {
    DataTable
} from '../..';
import data from '../../test/data/people.json';

const columns = [
    { title: 'ID', field: 'id' },
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Email', field: 'email' },
    { title: 'Gender', field: 'gender' }
];

describe('DataTable', () => {
    it('Can display', () => {
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } />
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('Can manually specify id field', () => {
        const columns = [
            { title: 'ID', field: 'id' },
            { title: 'First Name', field: 'first_name', id: true },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Email', field: 'email' },
            { title: 'Gender', field: 'gender' }
        ];
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } />
        );
        expect(wrapper.find('tbody tr').key()).toEqual('Cobbie');
    });
    it('Supports custom column rendering', () => {
        const columns = [
            { title: 'id', field: 'id' },
            { title: 'Actions', field: '_actions', render() { return 'test'; } }
        ];
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } />
        );
        expect(wrapper.find('tbody tr td').at(1).key()).toEqual('1_actions');
        expect(wrapper.find('tbody tr td').at(1).text()).toEqual('test');
    });
    it('Clicking unsortable header does not trigger handler', () => {
        const columns = [
            { title: 'id', field: 'id' },
            { title: 'First Name', field: 'first_name', sortable: false }
        ];
        const fn = jest.fn();
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } onHeaderClick={ fn } />
        );
        wrapper.find('thead ColumnHeader th').at(1).simulate('click');
        expect(fn.mock.calls.length).toBe(0);
    });
    it('Displays no-data message', () => {
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } />
        );
        expect(wrapper.find('.no-data').exists()).toBe(true);
    });
    it('Can click header', () => {
        const fn = jest.fn();
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } onHeaderClick={ fn } />
        );
        wrapper.find('thead ColumnHeader th').at(0).simulate('click');
        expect(fn.mock.calls.length).toBe(1);
        expect(fn).toBeCalledWith('id', '+', expect.anything());
    });
    it('Can click header with default no-op handler', () => {
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } />
        );
        // Should not cause error
        wrapper.find('thead ColumnHeader th').at(0).simulate('click');
    });
    it('Can click header with undefined handler', () => {
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } onHeaderClick={ null } />
        );
        // Should not cause error
        wrapper.find('thead ColumnHeader th').at(0).simulate('click');
    });
    it('Can keydown header', () => {
        const fn = jest.fn();
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } onHeaderClick={ fn } />
        );
        wrapper.find('thead ColumnHeader th').at(0).simulate('keyDown', {
            keyCode: 13,
            which: 13,
            key: 'Enter'
        });
        expect(fn.mock.calls.length).toBe(1);
        expect(fn).toBeCalledWith('id', '+', expect.anything());
    });
    it('Can keydown header with default no-op handler', () => {
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } />
        );
        // Should not cause error
        wrapper.find('thead ColumnHeader th').at(0).simulate('keyDown', {
            keyCode: 13,
            which: 13,
            key: 'Enter'
        });
    });
    it('Can keydown header with undefined handler', () => {
        const wrapper = mount(
            <DataTable data={ [] } columns={ columns } onHeaderClick={ null } />
        );
        // Should not cause error
        wrapper.find('thead ColumnHeader th').at(0).simulate('keyDown', {
            keyCode: 13,
            which: 13,
            key: 'Enter'
        });
    });
    it('Can click row', () => {
        const fn = jest.fn();
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } onRowClick={ fn } />
        );
        wrapper.find('tbody tr').at(0).simulate('click');
        expect(fn.mock.calls.length).toBe(1);
    });
    it('Can click row with default no-op handler', () => {
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } />
        );
        // Should not cause error
        wrapper.find('tbody tr').at(0).simulate('click');
    });
    it('Can click row with undefined handler', () => {
        const wrapper = mount(
            <DataTable data={ data.slice(0, 1) } columns={ columns } onRowClick={ null } />
        );
        // Should not cause error
        wrapper.find('tbody tr').at(0).simulate('click');
    });
});
