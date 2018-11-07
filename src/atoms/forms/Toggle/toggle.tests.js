import React from 'react';
import Toggle from '.';
import Form from '../Form';
import FieldGroup from '../FieldGroup';
import {
    basicChangeableTests,
    rerenderSuppressionTests
} from '../../../../test/utils';

const validProps = {
    name: 'test',
    value: 'fire',
    onChange: () => {}
};

const expectedProps = {
    name: 'test',
    value: 'fire',
    onChange: expect.any(Function)
};

describe('Toggle', () => {
    basicChangeableTests(Toggle, 'input', validProps, expectedProps);
    rerenderSuppressionTests(Toggle, validProps);

    describe('Form Context Usage', () => {
        it('Gets checked state from form', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <Toggle name="test" value="sausages" />
                </Form>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(true);
        });

        it('Prefers local attributes over form attributes', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <Toggle name="test" value="sausages" checked={ false } />
                </Form>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Remains unchecked if form field has incorrect value', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'hotdogs' }}>
                    <Toggle name="test" value="sausages" />
                </Form>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Can check multiple', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: ['hotdogs', 'sausages'] }}>
                    <Toggle name="test" value="hotdogs" />
                    <Toggle name="test" value="sausages" />
                    <Toggle name="test" value="burgers" />
                </Form>
            );
            expect(wrapper.find('input[value="hotdogs"]').prop('checked')).toEqual(true);
            expect(wrapper.find('input[value="sausages"]').prop('checked')).toEqual(true);
            expect(wrapper.find('input[value="burgers"]').prop('checked')).toEqual(false);
        });
    });

    describe('FieldGroup Context Usage', () => {
        it('Gets name from group', () => {
            const wrapper = mount(
                <FieldGroup name="test">
                    <Toggle value="sausages" />
                </FieldGroup>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
        });

        it('Prefers local name over group name', () => {
            const wrapper = mount(
                <FieldGroup name="test">
                    <Toggle name="test2" value="sausages" />
                </FieldGroup>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test2');
        });
    });

    describe('Form + FieldGroup Context Usage', () => {
        it('Gets state from form', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <FieldGroup name="test">
                        <Toggle value="sausages" />
                    </FieldGroup>
                </Form>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
            expect(wrapper.find('input').prop('checked')).toEqual(true);
        });

        it('Prefers state from field', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <FieldGroup name="test">
                        <Toggle value="sausages" checked={ false } />
                    </FieldGroup>
                </Form>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });
    });
});
