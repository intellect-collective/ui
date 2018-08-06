import React from 'react';
import Button from '.';
import {
    getInvalidFieldError,
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

describe('Button', () => {
    basicClickableTests(Button, 'button', validProps, expectedProps);

    it.only('Should throw an error on invalid type', () => {
        expect(() => {
            mount(<Button name="test" type="invalid">Execute</Button>);
        }).toThrowError(getInvalidFieldError('type'));
    });

    it('Should have a default type', () => {
        const wrapper = mount(<Button name="test" value="Execute" />);
        expect(wrapper.find('button').prop('type')).toEqual('button');
    });
});
