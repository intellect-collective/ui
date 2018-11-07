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
    name: 'test'
};

describe('File', () => {
    basicChangeableTests(File, 'input', validProps, expectedProps);
    // rerenderSuppressionTests(File, validProps);
});
