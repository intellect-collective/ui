import React from 'react';
import File from '.';
import {
    basicChangeableTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    onClick: () => {}
};
const expectedProps = {
    name: 'test',
    value: {},
    onClick: expect.any(Function)
};

describe('File', () => {
    basicChangeableTests(File, 'input', validProps, expectedProps);
});
