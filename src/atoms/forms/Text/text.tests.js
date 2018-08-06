import React from 'react';
import Text from '.';
import {
    basicChangeableTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    value: 'pithy',
    onChange: () => {}
};
const expectedProps = {
    name: 'test',
    value: 'pithy',
    onChange: expect.any(Function)
};

describe('Text', () => {
    basicChangeableTests(Text, 'input', validProps, expectedProps);
});
