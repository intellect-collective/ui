import React from 'react';
import DateField from '.';
import Form from '../Form';
import {
    basicChangeableTests,
    rerenderSuppressionTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    value: '20120409',
    onClick: () => {}
};
const expectedProps = {
    name: 'test',
    value: '2012-04-09',
    onClick: expect.any(Function)
};

describe('Date', () => {
    basicChangeableTests(DateField, 'input', validProps, expectedProps);
    rerenderSuppressionTests(DateField, validProps);

    describe('Form Context Usage', () => {
        it('Gets value from form', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: '20140918' }}>
                    <DateField name="test" />
                </Form>
            );
            expect(wrapper.find('input').prop('value')).toEqual('2014-09-18');
        });
        it('Prefers local value', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: '20140918' }}>
                    <DateField name="test" value="20160514" />
                </Form>
            );
            expect(wrapper.find('input').prop('value')).toEqual('2016-05-14');
        });
    });
});
