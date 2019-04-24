import React from 'react';
import { ifSort } from '.';

describe('ifSort()', () => {
    it('Returns unsorted on wrong column', () => {
        expect(ifSort('first_name', '+id', 'asc', 'desc', 'un')).toEqual('un');
    });
    it('Returns ascending', () => {
        expect(ifSort('id', 'id', 'asc', 'desc', 'un')).toEqual('asc');
        expect(ifSort('id', '+id', 'asc', 'desc', 'un')).toEqual('asc');
    });
    it('Returns descending', () => {
        expect(ifSort('id', '-id', 'asc', 'desc', 'un')).toEqual('desc');
    });
});
