import React from 'react';
import { getSort } from '.';

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
