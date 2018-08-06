import React from 'react';
import Password from '.';
import {
    basicChangeableTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    value: 'secret',
    onClick: () => {}
};
const expectedProps = {
    name: 'test',
    value: 'secret',
    onClick: expect.any(Function)
};

describe('Password', () => {
    basicChangeableTests(Password, 'input', validProps, expectedProps);
});
