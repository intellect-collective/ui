import React from 'react';
import Hidden from '.';
import {
    expectConsoleError,
    getMissingFieldError,
    rerenderSuppressionTests
} from '../../../../test/utils';

describe('Hidden', () => {
    rerenderSuppressionTests(Hidden, { name: 'test' });

    it('Should throw an error on missing name', () => {
        expectConsoleError(() => {
            mount(<Hidden />);
        }, getMissingFieldError('name'));
    });

    it('Should accept valid props', () => {
        const wrapper = mount(<Hidden name="test" value="sausages" />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('name')).toEqual('test');
        expect(wrapper.find('input').prop('value')).toEqual('sausages');
    });
});
