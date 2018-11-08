import React from 'react';
import { StateControlledAutoComplete } from '../../../..';
import {
    basicChangeableTests
} from '../../../../test/utils';

const validProps = {
    id: 'test',
    name: 'test',
    value: 'fire',
    items: [
        { title: 'Wind', value: 'wind' },
        { title: 'Air', value: 'air' },
        { title: 'Fire', value: 'fire' },
        { title: 'Water', value: 'water' }
    ]
};

const expectedProps = {
    id: 'test',
    name: 'test',
    value: 'fire'
};

describe('StateControlledAutoComplete', () => {
    basicChangeableTests(StateControlledAutoComplete, 'input', validProps, expectedProps);

    describe('Basic Operations', () => {
        it('Open value sits in state', () => {
            const wrapper = mount(
                <StateControlledAutoComplete { ...validProps } />
            );
            expect(wrapper.find('AutoComplete').prop('open')).toEqual(undefined);
            wrapper.find('input').simulate('focus');
            expect(wrapper.find('AutoComplete').prop('open')).toEqual(true);
        });

        it('Closing clears highlight', () => {
            const wrapper = mount(
                <StateControlledAutoComplete { ...validProps } />
            );
            wrapper.find('input').simulate('focus');
            wrapper.find('#test-result-1').simulate('mouseenter');
            expect(wrapper.find('AutoComplete').prop('open')).toEqual(true);
            expect(wrapper.find('AutoComplete').prop('highlightedIndex')).toEqual(1);
            wrapper.find('input').simulate('blur');
            expect(wrapper.find('AutoComplete').prop('open')).toEqual(false);
            expect(wrapper.find('AutoComplete').prop('highlightedIndex')).toEqual(undefined);
        });

        it('Gets value from state', () => {
            const wrapper = mount(
                <StateControlledAutoComplete name="test" items={ validProps.items } />
            );
            wrapper.find('input').simulate('change', {
                target: {
                    value: 'a'
                }
            });
            wrapper.update();
            expect(wrapper.find('input').prop('value')).toEqual('a');
        });

        it('Select passes through onChange', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <StateControlledAutoComplete { ...validProps } onChange={ fn } />
            );
            wrapper.find('#test-result-1').simulate('click');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: 'test',
                    value: 'air',
                    index: 1
                }
            });
        });

        it('Works with external state provider', () => {
            let data = {};
            const set = (o) => { data = { ...data, ...o }; };
            const wrapper = mount(
                <StateControlledAutoComplete { ...validProps } state={{ data, set }} />
            );
            wrapper.find('#test-result-1').simulate('mouseenter');
            expect(data).toMatchObject({
                highlightedIndex: 1
            });
        });
    });
});
