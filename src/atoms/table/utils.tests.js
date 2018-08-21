import React from 'react';
import { getSort, ifSort } from './utils';

describe('Table utilities', () => {
    describe('getSort()', () => {
        it('Returns undefined on undefined or empty sort specifier', () => {
            expect(getSort()).toEqual([undefined, undefined]);
            expect(getSort(null)).toEqual([undefined, undefined]);
            expect(getSort('')).toEqual([undefined, undefined]);
        });
        it('Returns col and negative on descending', () => {
            expect(getSort('-first_name')).toEqual(['first_name', '-']);
        });
        it('Returns col and positive on ascending', () => {
            expect(getSort('first_name')).toEqual(['first_name', '+']);
            expect(getSort('+first_name')).toEqual(['first_name', '+']);
        });
    });
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
});
