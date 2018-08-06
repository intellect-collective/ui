import React from 'react';
import Radio from '.';
import Form from '../Form';
import FieldGroup from '../FieldGroup';
import {
    basicChangeableTests
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

describe('Radio', () => {
    basicChangeableTests(Radio, 'input', validProps, expectedProps);

    describe('Form Context Usage', () => {
        it('Gets checked state from form', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <Radio name="test" value="sausages" />
                </Form>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(true);
        });

        it('Prefers local attributes over form attributes', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <Radio name="test" value="sausages" checked={ false } />
                </Form>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Remains unchecked if form field has incorrect value', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'hotdogs' }}>
                    <Radio name="test" value="sausages" />
                </Form>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Can check multiple', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: ['hotdogs', 'sausages'] }}>
                    <Radio name="test" value="hotdogs" />
                    <Radio name="test" value="sausages" />
                    <Radio name="test" value="burgers" />
                </Form>
            );
            expect(wrapper.find('input[value="hotdogs"]').prop('checked')).toEqual(true);
            expect(wrapper.find('input[value="sausages"]').prop('checked')).toEqual(true);
            expect(wrapper.find('input[value="burgers"]').prop('checked')).toEqual(false);
        });
    });

    describe('FieldGroup Context Usage', () => {
        it('Gets name and checked state from group', () => {
            const wrapper = mount(
                <FieldGroup name="test" value="sausages">
                    <Radio value="sausages" />
                </FieldGroup>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
            expect(wrapper.find('input').prop('checked')).toEqual(true);
        });

        it('Prefers local attributes over group attributes', () => {
            const wrapper = mount(
                <FieldGroup name="test" value="sausages">
                    <Radio value="sausages" checked={ false } />
                </FieldGroup>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Prefers local name over group name', () => {
            const wrapper = mount(
                <FieldGroup name="test" value="sausages">
                    <Radio name="test2" value="sausages" />
                </FieldGroup>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test2');
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Remains unchecked if group has incorrect value', () => {
            const wrapper = mount(
                <FieldGroup name="test" value="hotdogs">
                    <Radio value="sausages" />
                </FieldGroup>
            );
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Can check multiple', () => {
            const wrapper = mount(
                <FieldGroup name="test" value={ ['hotdogs', 'sausages'] }>
                    <Radio value="hotdogs" />
                    <Radio value="sausages" />
                    <Radio value="burgers" />
                </FieldGroup>
            );
            expect(wrapper.find('input[value="hotdogs"]').prop('checked')).toEqual(true);
            expect(wrapper.find('input[value="sausages"]').prop('checked')).toEqual(true);
            expect(wrapper.find('input[value="burgers"]').prop('checked')).toEqual(false);
        });
    });

    describe('Form + FieldGroup Context Usage', () => {
        it('Gets state from form', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <FieldGroup name="test">
                        <Radio value="sausages" />
                    </FieldGroup>
                </Form>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
            expect(wrapper.find('input').prop('checked')).toEqual(true);
        });

        it('Prefers state from group', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <FieldGroup name="test" value="hotdogs">
                        <Radio value="sausages" />
                    </FieldGroup>
                </Form>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });

        it('Prefers state from field', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <FieldGroup name="test" value="hotdogs">
                        <Radio value="sausages" checked={ false } />
                    </FieldGroup>
                </Form>
            );
            expect(wrapper.find('input').prop('name')).toEqual('test');
            expect(wrapper.find('input').prop('checked')).toEqual(false);
        });
    });
});
