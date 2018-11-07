import React from 'react';
import SubmitButton from '.';
import {
    basicClickableTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    type: 'submit',
    onClick: () => {}
};

const expectedProps = {
    name: 'test',
    type: 'submit',
    onClick: expect.any(Function)
};

describe('SubmitButton', () => {
    basicClickableTests(SubmitButton, 'button', validProps, expectedProps);
    // rerenderSuppressionTests(SubmitButton, validProps);

    it('Ignores button type', () => {
        const wrapper = mount(<SubmitButton name="test" type="button" />);
        expect(wrapper.find('button').prop('type')).toEqual('submit');
    });
});
