import React from 'react';
import deriveFormState from './deriveFormState';

describe('Form Components - deriveFormState helper', () => {
    describe('Original data', () => {
        it('Will not set original data if not present in props', () => {
            const result = deriveFormState({}, {});
            expect(result).not.toHaveProperty('original');
        });

        it('Sets original data if not already set', () => {
            const result = deriveFormState({ values: { test: 'sausages' } }, {});
            expect(result).toMatchObject({
                original: {
                    test: 'sausages'
                },
                values: {
                    test: 'sausages'
                }
            });
        });
    });

    describe('Current values data', () => {
        it('Original data remains unchanged on values prop update', () => {
            const result = deriveFormState(
                { values: { test: 'hotdogs' } },
                {
                    original: { test: 'sausages' },
                    values: { test: 'hotdogs' }
                }
            );
            expect(result).toMatchObject({
                lastValues: {
                    test: 'hotdogs'
                }
            });
        });

        it('Sets new value where it did not exist before', () => {
            const result = deriveFormState(
                { values: { test: 'sausages' } },
                {
                    original: { },
                    values: { test2: 'hotdogs' }
                }
            );
            expect(result).toMatchObject({
                values: {
                    test: 'sausages'
                }
            });
        });

        it('Overwrites existing, non-dirty value', () => {
            const result = deriveFormState(
                { values: { test: 'hotdogs' } },
                {
                    original: { test: 'sausages' },
                    values: { test: 'sausages' }
                }
            );
            expect(result).toMatchObject({
                values: {
                    test: 'hotdogs'
                }
            });
        });
    });

    describe('Conflicting data', () => {
        it('Sets field conflict data if changed field is dirty', () => {
            const result = deriveFormState(
                { values: { test: 'hotdogs' } },
                {
                    original: { test: 'sausages' },
                    values: { test: 'steak' },
                    dirty: ['test']
                }
            );
            expect(result).toMatchObject({
                conflicts: {
                    test: 'hotdogs'
                }
            });
        });

        it('Removes field conflict data if the prop value matches the state value', () => {
            const result = deriveFormState(
                { values: { test: 't', test2: 'he' } },
                {
                    original: {},
                    values: {
                        test: 't',
                        test2: 'he'
                    },
                    lastValues: {
                        test: 'test',
                        test2: 'he'
                    },
                    conflicts: {
                        test: 'test'
                    },
                    dirty: [
                        'test',
                        'test2'
                    ]
                }
            );
            expect(result.conflicts).toEqual({});
        });
    });

    describe('Sets error data if not already set', () => {
        it('Will not set if not present in props', () => {
            const result = deriveFormState({}, {});
            expect(result.errors).toEqual(undefined);
        });

        it('Will set if present in props and not already in state', () => {
            const result = deriveFormState({
                errors: {
                    test: 'Invalid value'
                }
            }, {});
            expect(result).toMatchObject({
                errors: {
                    test: 'Invalid value'
                }
            });
        });
    });
});
