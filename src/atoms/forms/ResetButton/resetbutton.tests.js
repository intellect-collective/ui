import React from 'react';
import ResetButton from '.';
import {
    basicClickableTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    onClick: () => {}
};

const expectedProps = {
    name: 'test',
    type: 'reset',
    onClick: expect.any(Function)
};

describe('ResetButton', () => {
    basicClickableTests(ResetButton, 'button', validProps, expectedProps);
    // rerenderSuppressionTests(ResetButton, validProps);

    it('Ignores button type', () => {
        const wrapper = mount(<ResetButton name="test" type="button" />);
        expect(wrapper.find('button').prop('type')).toEqual('reset');
    });
});
