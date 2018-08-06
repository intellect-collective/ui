import React from 'react';
import Hidden from '.';
import {
    getMissingFieldError,
    validMount
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    value: 'sausages'
};

describe('Hidden', () => {
    it('Should throw an error on missing name', () => {
        expect(() => {
            validMount(Hidden);
        }).toThrowError(getMissingFieldError('name'));
    });

    it('Should accept valid props', () => {
        const wrapper = mount(<Hidden { ...validProps } />);
        expect(wrapper).toMatchSnapshot();
        Object.keys(validProps)
            .forEach((key) => {
                expect(wrapper.find('input').prop(key))
                    .toEqual(validProps[key]);
            });
    });
});
