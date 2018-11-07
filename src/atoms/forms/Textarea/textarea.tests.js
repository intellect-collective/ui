import React from 'react';
import Textarea from '.';
import {
    basicChangeableTests,
    rerenderSuppressionTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    value: 'secret',
    onChange: () => {}
};
const expectedProps = {
    name: 'test',
    value: 'secret',
    onChange: expect.any(Function)
};

describe('Textarea', () => {
    basicChangeableTests(Textarea, 'textarea', validProps, expectedProps);
    rerenderSuppressionTests(Textarea, validProps);
});
